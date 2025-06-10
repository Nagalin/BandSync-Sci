import { applyDecorators } from '@nestjs/common'
import { ApiBadRequestResponse, ApiForbiddenResponse, ApiResponse } from '@nestjs/swagger'

export const UnauthorizedResponse = () => {
  return applyDecorators(
    ApiResponse({
      status: 401,
      description: 'Unauthorized - Multiple possible causes: missing authorization header, invalid access token, or insufficient permissions',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Missing authorization header, invalid access token or your discord account does not have access to this application'
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