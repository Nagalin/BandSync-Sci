import { applyDecorators } from "@nestjs/common"
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger"
import { GetUserDtoResponse } from "../dto/get-user.dto"
import { UnauthorizedResponse } from "src/decorators/api-responses.decorator"

export const SwaggerFindAllUsers = () => {
    return applyDecorators(
       ApiOperation({ summary: 'Get all users' }),
       ApiOkResponse({
            description: 'retrieved user successfully',
            isArray: true,
            type: GetUserDtoResponse
        }),
        UnauthorizedResponse()

    )
}