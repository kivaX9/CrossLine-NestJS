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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Profile_1 = require("../../../typeorm/entities/Profile");
const User_1 = require("../../../typeorm/entities/User");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userRepository, profileRepository, jwtService) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.jwtService = jwtService;
    }
    async registerUser(registerUserDetails) {
        const newUser = this.userRepository.create({ ...registerUserDetails });
        const savedUser = await this.userRepository.save(newUser);
        const newProfile = this.profileRepository.create({ user: savedUser });
        await this.profileRepository.save(newProfile);
        return savedUser;
    }
    async loginUser(loginUserDetails) {
        const { username, password } = loginUserDetails;
        const user = await this.userRepository.findOneBy({ username });
        if (user.password !== password) {
            throw new common_1.UnauthorizedException();
        }
        const payload = { sub: user.id, username: user.username };
        user.token = await this.jwtService.signAsync(payload);
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(Profile_1.Profile)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map