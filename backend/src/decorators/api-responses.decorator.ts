import { applyDecorators } from '@nestjs/common'
import { ApiBadRequestResponse, ApiForbiddenResponse, ApiResponse } from '@nestjs/swagger'

export const UnauthorizedResponse = () => {
  return applyDecorators(
    ApiResponse({
      status: 401,
      description: 'Unauthorized - Either missing authorization header or account has no permission',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Missing authorization header or your account does not have access to this application'
          }
        }
      }
    })
  )
}

export const BadRequestResponse = () => {
  return applyDecorators(
    ApiBadRequestResponse({
      description: 'Invalid payload',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Bad request excetion'
          }
        }
      }
    })
  )
}

export const ForbiddenBackstageResponse = () => {
  return applyDecorators(
    ApiForbiddenResponse({
      description: 'Forbidden - Backstage access required',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Backstage access required'
          }
        }
      }
    })
  )
}

export const ForbiddenSystemAdminResponse = () => {
  return applyDecorators(
    ApiForbiddenResponse({
      description: 'Forbidden - System admin access required',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'System admin access required'
          }
        }
      }
    })
  )
}
