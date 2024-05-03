import { ObjectSchema } from 'joi'
// Joi coloca any, no es que yo le deje
export const validateFromObject = <T>(schema: ObjectSchema, objectToValidate: T) => {
  const { error } = schema.validate(objectToValidate, { abortEarly: false });
  
  if (error) {
    // concatenar mensajes de error
    let messageError = '';
    for (let i = 0; i < error.details.length; i++ ) {
      messageError = `${messageError} ${error.details[i].message}`
    }
    
    return {
      status: 400,
      message: messageError
    };
  }
  return true;
}