import { LoginUserDto } from 'src/auth/dtos/LoginUser.dto';
import { AuthService } from 'src/auth/services/auth/auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    createUser(loginUserDto: LoginUserDto): Promise<import("../../../typeorm/entities/User").User>;
}
