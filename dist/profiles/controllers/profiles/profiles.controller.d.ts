import { UpdateProfileDto } from 'src/profiles/dtos/UpdateProfile';
import { ProfilesService } from 'src/profiles/services/profiles/profiles.service';
export declare class ProfilesController {
    private profileService;
    constructor(profileService: ProfilesService);
    getProfile(id: number): Promise<import("../../../typeorm/entities/Profile").Profile>;
    updateProfile(id: number, updateProfileDto: UpdateProfileDto): Promise<void>;
    deleteUser(id: number): Promise<void>;
}
