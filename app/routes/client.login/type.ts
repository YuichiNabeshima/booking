import { z } from 'zod';


export const schema = z.object({
  email: z
    .string({ required_error: 'This field is required.' })
    .email({ message: 'Please enter email format.' })
    ,
  password: z
    .string({ required_error: 'This field is required.' })
    ,
})
;
