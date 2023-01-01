import { Body } from '@nestjs/common';
import { UserService } from './user.service';
import { EditUserDto } from './dto/edit-user.dto';
import {
    Controller,
    Get,
    Patch,
    UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private UserService: UserService) { }
    @Get('me')
    getMe(@GetUser() user: User) {
        return user;
    }

    @Patch()
    editUser(
        @GetUser('id') userId: number,
        @Body() dto: EditUserDto,
    ) {
        return this.UserService.editUser(userId, dto)
    }
}
