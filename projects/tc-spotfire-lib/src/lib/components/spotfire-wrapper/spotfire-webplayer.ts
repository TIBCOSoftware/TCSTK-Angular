// Copyright (c) 2018-2018. TIBCO Software Inc. All Rights Reserved. Confidential & Proprietary.
import { Observable, forkJoin, of as observableOf, zip } from 'rxjs';
import { SpotfireCustomization } from './spotfire-customization';
import { mergeMap, tap, pluck, map } from 'rxjs/operators';

declare let spotfire: any;

export const CUSTLABELS = {
  showAbout: 'Show the about menu item',
  showAnalysisInformationTool: 'Show the analysis information tool menu item',
  showAuthor: 'Show the button for enabling authoring',
  showClose: 'Show the analysis close menu item',
  showCustomizableHeader: 'Show the customizable header',
  showDodPanel: 'Show the details on demand panel in the visualization.',
  showExportFile: 'Show the export file menu item',
  showExportVisualization: 'Show the export visualization menu item',
  showFilterPanel: 'Show the filter panel.',
  showHelp: 'Show the help menu item',
  showLogout: 'Show the logout menu item',
  showPageNavigation: 'Show the page navigation controls in the analysis',
  showReloadAnalysis: 'Show the Reload analysis button in the toolbar',
  showStatusBar: 'Show status bar in the Web Player',
  showToolBar: 'Show the analysis toolbar and menu',
  showUndoRedo: 'Show the undo/redo menu item'
};

class PageState { index: number; pageTitle: string; }
class DataTable { dataTableName: string; }
class DataColumn { dataColumnName: string; dataTableName: string; dataType: string; values: {}; }
class DistinctValues { count: number; values: Array<string>; }


function doCall<T>(obj, m: string, ...a): Observable<T> {
  return Observable.create(observer => {
    // console.log('[OBS]', 'doCall obj=', obj, ', m=', m, ', arg=', args, typeof obj);
    if (typeof obj[m] !== 'function' || !obj) {
      console.error('[OBS]', 'pas de ', m, 'sur ', obj);
      observer.error(`pas de function ${m} sur l'objet ${JSON.stringify(obj)}`);
    }
    try {
      // console.log('[OBS]', `Call ${m}(${args.join(',')})`, args.length);
      const p = (g: T) => { observer.next(g); observer.complete(); };
      const q = (g: T) => observer.next(g);
      const s = m.startsWith('on');
      switch (a.length) {
        case 0: return s ? obj[m](q) : obj[m](p);
        case 1: return s ? obj[m](a[0], q) : obj[m](a[0], p);
        case 2: return s ? obj[m](a[0], a[1], q) : obj[m](a[0], a[1], p);
        case 3: return s ? obj[m](a[0], a[1], a[2], q) : obj[m](a[0], a[1], a[2], p);
        case 4: return s ? obj[m](a[0], a[1], a[2], a[3], q) : obj[m](a[0], a[1], a[2], a[3], p);
        default: observer.error(`Call ${m}(${a.join(',')}) pb arguments`);
      }
    } catch (err) {
      console.warn('[OBS]', 'doCall erreur: ', err);
      observer.error(err);
    }
  });
}

export class Application {
  private _app;
  constructor(
    public url: string,
    public customization: SpotfireCustomization | string,
    public path: string,
    public parameters: string,
    public reloadAnalysisInstance: boolean,
    public version: string,
    public onReadyCallback,
    public onCreateLoginElement) {
    this._app = new spotfire.webPlayer.createApplication(this.url,
      this.customization, this.path, this.parameters, this.reloadAnalysisInstance,
      this.version, this.onReadyCallback, this.onCreateLoginElement);
  }
  setApp = (a) => this._app = a;
  // getDocument(id, page, customization)
  getDocument = (id, p, c?): Document => new Document(this._app, id, p, c ? c : this.customization)
}

export class Document {
  private _doc;
  marking: Marking;
  filtering: Filtering;
  data: Data;
  constructor(app, id, page, custo) {
    this._doc = app.openDocument(id, page, custo);
    this.marking = new Marking(this._doc.marking);
    this.filtering = new Filtering(this._doc.filtering);
    this.data = new Data(this._doc.data);
  }
  private do = <T>(m) => doCall<T>(this._doc, m);
  getDocumentMetadata$ = (): Observable<DocMetadata> => this.do<DocMetadata>('getDocumentMetadata').pipe(
    map(g => new DocMetadata(g)))
  getPages$ = () => this.do('getPages').pipe(map(m => Object.keys(m).map(f => m[f].pageTitle)));
  // getDocumentProperties$ = () => this.do('getDocumentProperties');
  // getBookmarks$ = () => this.do('getBookmarks');
  // getBookmarkNames$ = () => this.do('getBookmarkNames');
  // getReports$ = () => this.do('getReports');
  getActivePage$ = () => this.do<PageState>('getActivePage');

  // getMarking = () => this.marking._marking;
  getFiltering = () => this.filtering._filtering;
  // getData = () => this.data._data;
}

class Marking {
  constructor(public _marking) { }
  getMarkingNames$ = () => doCall<string[]>(this._marking, 'getMarkingNames').pipe(tap(f => console.log('getMarkingNames returns', f)));
  onChanged$ = (m, t, c, n) => doCall(this._marking, 'onChanged', m, t, c, n);
}

class Filtering {
  constructor(public _filtering) { }
  set = (flts) => this._filtering.setFilters(flts, spotfire.webPlayer.filteringOperation.REPLACE);
}

export class Data {
  allTables = {};
  constructor(public _data) { }

  private getDataTables$ = () => doCall<DataTable[]>(this._data, 'getDataTables');

  private getDataTable$ = (t) => doCall<DataTable>(this._data, 'getDataTable', t).pipe(mergeMap(f => this.getDataColumns$(f)));

  private getDataColumns$ = (t) => doCall<DataColumn[]>(t, 'getDataColumns').pipe(
    mergeMap(columns => {
      const obs = [];
      columns.forEach((col: DataColumn) => {
        if (col.dataType === 'String') {
          obs.push(zip(...[observableOf(col), this.getDistinctValues$(col)],
            (a: DataColumn, b) => ({ colName: a.dataColumnName, tabName: a.dataTableName, vals: b })));
        }
      });
      return forkJoin(obs);
    }))

  private getDistinctValues$ = (t: DataColumn, s = 0, n = 20) => doCall<DistinctValues>(t, 'getDistinctValues', s, n).pipe(
    tap(g => console.log('[OBS]', 'DistinctValues', g, g.count > 0 && g.count < 25)),
    // filter(g => g.count > 0 && g.count < 25),
    //  tap(g => console.log('[OBS]', 'DistinctValues filtres', g)),
    pluck('values'))

  getAllTables$ = () => this.getDataTables$().pipe(
    mergeMap(tables => {
      const obs = [];
      tables.forEach(table => obs.push(this.getDataTable$(table.dataTableName)));
      return forkJoin(obs);
    }), map(tables => {
      console.log('getAllTables RAW:', tables[0]);
      const dataTables = {};
      tables[0].forEach(columns => {
        const tname = columns['tabName'];
        if (!dataTables[tname]) { dataTables[tname] = {}; }
        dataTables[tname][columns['colName']] = columns.vals;
      });
      return dataTables;
    }))
}

export class DocMetadata {
  size: number;
  sizeUnit = 'B';
  contentSize: number;
  created: Date;
  description: string;
  lastModified: Date;
  path: string;
  title: string;

  constructor(p?) {
    if (p) {
      this.contentSize = parseInt(p['contentSize'], 10);
      if (this.contentSize > (1024 * 1024)) {
        this.size = this.contentSize / (1024 * 1024);
        this.sizeUnit = 'MB';
      } else if (this.contentSize > 1024) {
        this.size = this.contentSize / 1024;
        this.sizeUnit = 'KB';
      }
      this.created = new Date(p.created);
      this.lastModified = new Date(p.lastModified);
      this.description = p.description;
      this.path = p.path;
      this.title = p.title;
    }
  }
}
