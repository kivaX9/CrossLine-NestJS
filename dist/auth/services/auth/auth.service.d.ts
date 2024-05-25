import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import { LoginUserParams, RegisterUserParams } from 'src/utils/types';
export declare class AuthService {
    private userRepository;
    private profileRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, profileRepository: Repository<Profile>, jwtService: JwtService);
    registerUser(registerUserDetails: RegisterUserParams): Promise<User>;
    loginUser(loginUserDetails: LoginUserParams): Promise<User>;
}
