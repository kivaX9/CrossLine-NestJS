import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import { LoginUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
export declare class AuthService {
    private userRepository;
    private profileRepository;
    constructor(userRepository: Repository<User>, profileRepository: Repository<Profile>);
    loginUser(loginUserDetails: LoginUserParams): Promise<User>;
}
