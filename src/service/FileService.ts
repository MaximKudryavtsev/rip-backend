import * as path from "path";
import * as mkdirp from "mkdirp";
import * as rimraf from "rimraf";
import * as formidable from "formidable";
import { Request, Response } from "express";
import { get, head, last, isEmpty } from "lodash";
import * as fs from "fs";
import { DataBase, EModels } from "./DataBase";
import { UserSchema } from "../schemas";
import { TokenService } from "./TokenService";
import * as uuid from "uuid";
import { uploadPaths } from "../config/UploadPaths";

export class FileService {
    private static readonly mediaString = `${path.resolve()}/media`;
    private readonly database = new DataBase();
    private readonly userModel = this.database.getModel(EModels.USERS, UserSchema);
    private readonly tokenService = new TokenService();

    static createFolder(name: string, type: string): void {
        mkdirp.sync(`${FileService.mediaString}/${type}/${name}`);
    }

    static deleteFolder(name: string, type: string): void {
        const pathname = `${FileService.mediaString}/${type}/${name}`;
        if (fs.existsSync(pathname)) {
            return;
        }
        rimraf.sync(pathname);
    }

    uploadAvatar(request: Request, response: Response): void {
        const form = new formidable.IncomingForm();
        form.uploadDir = uploadPaths.AVATAR;
        form.keepExtensions = true;
        form.parse(request, ((error, fields, files) => {
            const token = get(fields, "token");
            const userId = this.tokenService.getUserIdByToken(token as string);
            this.deleteOldAvatar(userId);
            FileService.createFolder(userId, "avatars");
            const avatarName = this.generateName();
            const oldPath = this.getFilePath(files);
            const newPath = `${uploadPaths.AVATAR}/${userId}/${avatarName}.${this.getExtension(oldPath)}`;
            fs.renameSync(oldPath, newPath);
            this.userModel.findByIdAndUpdate(userId, {avatar: `${avatarName}.${this.getExtension(oldPath)}`})
                .then((() => {
                    response.json({success: true});
                }));
        }));
    }

    async deleteAvatar(userId: string, response: Response): Promise<void> {
        FileService.deleteFolder(userId, "avatars");
    }

    private getPathToFolder(name: string): string {
        return `${FileService.mediaString}/${name}`;
    }

    // govnokod starts

    private getFilePath(data: any): string {
        return get(get(data, "file"), "path");
    }

    private getExtension(pathname: string): string {
        const index = pathname.indexOf("upload");
        return last(pathname.substr(index).split("."));
    }

    private generateName(): string {
        return uuid.v4().toString().substr(0, 20);
    }

    private deleteOldAvatar(userId: string): void {
        const pathname = `${uploadPaths.AVATAR}/${userId}`;
        if (!fs.existsSync(pathname)) {
            return;
        }
        fs.readdir(pathname, (err, files) => {
            if (err) {
                throw err;
            }
            if (isEmpty(files)) {
                return;
            }
            for (const file of files) {
                fs.unlink(path.join(pathname, file), (error) => {
                    if (error) {
                        throw err;
                    }
                });
            }
        });
    }
}
