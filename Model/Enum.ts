export enum ImportantLevel {
    high,
    medium,
    low
}

var ImportantLevelColor = new Array<string>();
ImportantLevelColor[ImportantLevel.high] = "#fc5603";
ImportantLevelColor[ImportantLevel.medium] = "#fcd303";
ImportantLevelColor[ImportantLevel.low] = "#90fc03";
export { ImportantLevelColor };
