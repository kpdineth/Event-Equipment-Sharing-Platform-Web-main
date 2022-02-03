//import { ClientSetting } from "../models/clientsettings";


export abstract class AppConfigurationApi {
    abstract load(): Promise<void>;
    abstract getBaseUrl(): string;
    // abstract getCenterScreenTopPosition(height: number): number;
    // abstract getCenterScreenLeftPosition(width: number): number;
    // abstract getServiceApiPath(): string;
    // abstract getServicePath(): string;
    // abstract getClientSettings(): ClientSetting;
    // abstract getQueryStringValue(key: string): string;
}
