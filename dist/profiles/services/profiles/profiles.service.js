"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilesService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const Profile_1 = require("../../../typeorm/entities/Profile");
let ProfilesService = class ProfilesService {
    constructor(profileRepository) {
        this.profileRepository = profileRepository;
    }
    async getProfile(id) {
        return await this.profileRepository.findOne({
            where: { user: { id } },
            relations: { user: true },
        });
    }
    updateProfile(id, updateProfileDetails) {
        return this.profileRepository.update({ user: { id } }, { ...updateProfileDetails });
    }
    deleteUser(id) {
        return this.profileRepository.delete({ id });
    }
};
exports.ProfilesService = ProfilesService;
exports.ProfilesService = ProfilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(Profile_1.Profile)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ProfilesService);
//# sourceMappingURL=profiles.service.js.map