import { applyDecorators } from '@nestjs/common'
import { ApiCreatedResponse, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ForbiddenSystemAdminResponse, UnauthorizedResponse } from 'src/decorators/api-responses.decorator'

export const SwaggerActivateUser = () => {
    return applyDecorators(
        ApiOperation({ summary: 'Activate new user accounts from Google Sheets data' }),
        ApiCreatedResponse({
            description: 'add new account by reading google sheets successfully'
        }),
        UnauthorizedResponse(),
        ForbiddenSystemAdminResponse()
    )
}

export const SwaggerTransferAdminPrivileges = () => {
    return applyDecorators(
        ApiOperation({ summary: 'Transfer system admin privileges to another user' }),
        ApiResponse({
            status: 200,
            description: 'transfer system admin privilege successfully'
        }),
        UnauthorizedResponse(),
        ForbiddenSystemAdminResponse()
    )
}

export const SwaggerDeactivateUser = () => {
    return applyDecorators(
        ApiOperation({ summary: 'Deactivate user accounts' }),
        ApiResponse({
            status: 200,
            description: 'successfully deactivate user account'
        }),
        UnauthorizedResponse(),
        ForbiddenSystemAdminResponse()
    )
}
