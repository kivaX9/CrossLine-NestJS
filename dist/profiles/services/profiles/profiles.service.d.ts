import { Repository } from 'typeorm';
import { Profile } from 'src/typeorm/entities/Profile';
import { UpdateProfileParams } from 'src/utils/types';
export declare class ProfilesService {
    private profileRepository;
    constructor(profileRepository: Repository<Profile>);
    getProfile(id: number): Promise<Profile>;
    updateProfile(id: number, updateProfileDetails: UpdateProfileParams): Promise<import("typeorm").UpdateResult>;
    deleteUser(id: number): Promise<import("typeorm").DeleteResult>;
}
