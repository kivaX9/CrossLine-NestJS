import { UsersService } from 'src/users/services/users/users.service';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    getUsers(): Promise<import("../../../typeorm/entities/User").User[]>;
    getUserById(id: number): Promise<import("../../../typeorm/entities/User").User>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<void>;
    deleteUser(id: number): Promise<void>;
}
