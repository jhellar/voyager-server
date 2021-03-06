import { Router } from 'express'
import { SchemaDirectives } from './SchemaDirectives'
import { AuthContextProviderClass } from './AuthContextProvider'

/**
 * This interface describes what a security service should look like.
 * A security service is a set of components that integrates an Apollo server
 * with third party SSO and/or AAA providers, or with popular AAA middlewares like passport.
 * You could build your own security service integrate your apollo server
 * with something like Keycloak, Auth0, Google Services etc.
 */
export interface SecurityService {

  /**
   * getTypeDefs returns any additional SDL that should be added to a GraphQL schema
   * to work with the security service.
   */
  getTypeDefs (): string

  /**
   * getSchemaDirectives should return an object containing directive
   * implementations. e.g. @isAuthenticated, @hasRole
   */
  getSchemaDirectives (): SchemaDirectives

  /**
   * getAuthContextProvider returns the security service's AuthContextProvider
   * The AuthContextProvider is responsible for adding the appropriate
   * Auth related info from the request into the the GraphQL context
   * Inside resolve functions. Example: context.auth.user
   */
  getAuthContextProvider (): AuthContextProviderClass

  /**
   *
   * @param expressApp the express router
   * @param options any additional options necessary
   *
   * applyAuthMiddleware should perform any setup needed to add authentication
   * at the http serer layer. E.g. adding a passport or keycloak middleware to express.
   * This is very connect/express oriented right now.
   * It would be great if we could add more flexibility to support other frameworks
   * Like hapi, koa, fastify, etc.
   */
  applyAuthMiddleware (expressApp: Router, options: any): void
}
