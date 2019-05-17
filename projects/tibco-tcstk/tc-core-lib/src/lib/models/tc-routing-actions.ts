// model used when a cockpit component wants app to change route

export class RouteAction {
  constructor(public action: string,
              public context: any
  ) {}
}
