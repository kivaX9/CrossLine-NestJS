import { LoginUserDto, RegisterUserDto } from 'src/auth/dtos/LoginUser.dto';
import { AuthService } from 'src/auth/services/auth/auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    registerUser(registerUserDto: RegisterUserDto): Promise<import("../../../typeorm/entities/User").User>;
    loginUser(loginrUserDto: LoginUserDto): Promise<import("../../../typeorm/entities/User").User>;
}
