import { Request } from "express";

export interface IUploadAvatarData {
    fileName: string;
    folderName: string;
    request: Request;
}
