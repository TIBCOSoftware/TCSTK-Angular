uiAppID.json contains the ID used to prefix shared state records. This should be unique on the subscription.

defaultAppConfig.json contains a default shared state record which will be stored to shared state when the application is first run and no shared state exists:

{
  "id": null,
  "applicationId": "1742",
  "typeId": "1",
  "caseTypeLabel": "Partner Request"
}
