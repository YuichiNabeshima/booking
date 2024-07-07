import { z } from 'zod';

export const schema = z.object({
  beforeValue: z
    .string()
    .optional()
    ,
  name: z
    .string({ required_error: 'It is required.' })
    ,
  courses: z
    .object({
      id: z.string()
        .optional()
      ,
      name: z.string({ required_error: 'It is required.' }),
      time_range: z.union([
        z.literal('30'),
        z.literal('60'),
        z.literal('90'),
        z.literal('120'),
        z.literal('150'),
        z.literal('180'),
      ], { errorMap: () => ({ message: 'Invalid value.' }) })
      ,
    })
    .array()
    ,
  capacityList: z
    .object({
      mon: z.object({
        time_11_12: z.number().max(10, 'Please enter less than 10 people.'),
        time_12_13: z.number().max(10, 'Please enter less than 10 people.'),
        time_13_14: z.number().max(10, 'Please enter less than 10 people.'),
        time_14_15: z.number().max(10, 'Please enter less than 10 people.'),
        time_15_16: z.number().max(10, 'Please enter less than 10 people.'),
        time_16_17: z.number().max(10, 'Please enter less than 10 people.'),
        time_17_18: z.number().max(10, 'Please enter less than 10 people.'),
        time_18_19: z.number().max(10, 'Please enter less than 10 people.'),
        time_19_20: z.number().max(10, 'Please enter less than 10 people.'),
        time_20_21: z.number().max(10, 'Please enter less than 10 people.'),
        time_21_22: z.number().max(10, 'Please enter less than 10 people.'),
        time_22_23: z.number().max(10, 'Please enter less than 10 people.'),
      }),
      tue: z.object({
        time_11_12: z.number().max(10, 'Please enter less than 10 people.'),
        time_12_13: z.number().max(10, 'Please enter less than 10 people.'),
        time_13_14: z.number().max(10, 'Please enter less than 10 people.'),
        time_14_15: z.number().max(10, 'Please enter less than 10 people.'),
        time_15_16: z.number().max(10, 'Please enter less than 10 people.'),
        time_16_17: z.number().max(10, 'Please enter less than 10 people.'),
        time_17_18: z.number().max(10, 'Please enter less than 10 people.'),
        time_18_19: z.number().max(10, 'Please enter less than 10 people.'),
        time_19_20: z.number().max(10, 'Please enter less than 10 people.'),
        time_20_21: z.number().max(10, 'Please enter less than 10 people.'),
        time_21_22: z.number().max(10, 'Please enter less than 10 people.'),
        time_22_23: z.number().max(10, 'Please enter less than 10 people.'),
      }),
      wed: z.object({
        time_11_12: z.number().max(10, 'Please enter less than 10 people.'),
        time_12_13: z.number().max(10, 'Please enter less than 10 people.'),
        time_13_14: z.number().max(10, 'Please enter less than 10 people.'),
        time_14_15: z.number().max(10, 'Please enter less than 10 people.'),
        time_15_16: z.number().max(10, 'Please enter less than 10 people.'),
        time_16_17: z.number().max(10, 'Please enter less than 10 people.'),
        time_17_18: z.number().max(10, 'Please enter less than 10 people.'),
        time_18_19: z.number().max(10, 'Please enter less than 10 people.'),
        time_19_20: z.number().max(10, 'Please enter less than 10 people.'),
        time_20_21: z.number().max(10, 'Please enter less than 10 people.'),
        time_21_22: z.number().max(10, 'Please enter less than 10 people.'),
        time_22_23: z.number().max(10, 'Please enter less than 10 people.'),
      }),
      thu: z.object({
        time_11_12: z.number().max(10, 'Please enter less than 10 people.'),
        time_12_13: z.number().max(10, 'Please enter less than 10 people.'),
        time_13_14: z.number().max(10, 'Please enter less than 10 people.'),
        time_14_15: z.number().max(10, 'Please enter less than 10 people.'),
        time_15_16: z.number().max(10, 'Please enter less than 10 people.'),
        time_16_17: z.number().max(10, 'Please enter less than 10 people.'),
        time_17_18: z.number().max(10, 'Please enter less than 10 people.'),
        time_18_19: z.number().max(10, 'Please enter less than 10 people.'),
        time_19_20: z.number().max(10, 'Please enter less than 10 people.'),
        time_20_21: z.number().max(10, 'Please enter less than 10 people.'),
        time_21_22: z.number().max(10, 'Please enter less than 10 people.'),
        time_22_23: z.number().max(10, 'Please enter less than 10 people.'),
      }),
      fri: z.object({
        time_11_12: z.number().max(10, 'Please enter less than 10 people.'),
        time_12_13: z.number().max(10, 'Please enter less than 10 people.'),
        time_13_14: z.number().max(10, 'Please enter less than 10 people.'),
        time_14_15: z.number().max(10, 'Please enter less than 10 people.'),
        time_15_16: z.number().max(10, 'Please enter less than 10 people.'),
        time_16_17: z.number().max(10, 'Please enter less than 10 people.'),
        time_17_18: z.number().max(10, 'Please enter less than 10 people.'),
        time_18_19: z.number().max(10, 'Please enter less than 10 people.'),
        time_19_20: z.number().max(10, 'Please enter less than 10 people.'),
        time_20_21: z.number().max(10, 'Please enter less than 10 people.'),
        time_21_22: z.number().max(10, 'Please enter less than 10 people.'),
        time_22_23: z.number().max(10, 'Please enter less than 10 people.'),
      }),
      sat: z.object({
        time_11_12: z.number().max(10, 'Please enter less than 10 people.'),
        time_12_13: z.number().max(10, 'Please enter less than 10 people.'),
        time_13_14: z.number().max(10, 'Please enter less than 10 people.'),
        time_14_15: z.number().max(10, 'Please enter less than 10 people.'),
        time_15_16: z.number().max(10, 'Please enter less than 10 people.'),
        time_16_17: z.number().max(10, 'Please enter less than 10 people.'),
        time_17_18: z.number().max(10, 'Please enter less than 10 people.'),
        time_18_19: z.number().max(10, 'Please enter less than 10 people.'),
        time_19_20: z.number().max(10, 'Please enter less than 10 people.'),
        time_20_21: z.number().max(10, 'Please enter less than 10 people.'),
        time_21_22: z.number().max(10, 'Please enter less than 10 people.'),
        time_22_23: z.number().max(10, 'Please enter less than 10 people.'),
      }),
      sun: z.object({
        time_11_12: z.number().max(10, 'Please enter less than 10 people.'),
        time_12_13: z.number().max(10, 'Please enter less than 10 people.'),
        time_13_14: z.number().max(10, 'Please enter less than 10 people.'),
        time_14_15: z.number().max(10, 'Please enter less than 10 people.'),
        time_15_16: z.number().max(10, 'Please enter less than 10 people.'),
        time_16_17: z.number().max(10, 'Please enter less than 10 people.'),
        time_17_18: z.number().max(10, 'Please enter less than 10 people.'),
        time_18_19: z.number().max(10, 'Please enter less than 10 people.'),
        time_19_20: z.number().max(10, 'Please enter less than 10 people.'),
        time_20_21: z.number().max(10, 'Please enter less than 10 people.'),
        time_21_22: z.number().max(10, 'Please enter less than 10 people.'),
        time_22_23: z.number().max(10, 'Please enter less than 10 people.'),
      }),
    })
    ,
  capacityListGroup: z
    .object({
      mon: z.object({
        time_11_12: z.number().max(10, 'Please enter less than 10 people.'),
        time_12_13: z.number().max(10, 'Please enter less than 10 people.'),
        time_13_14: z.number().max(10, 'Please enter less than 10 people.'),
        time_14_15: z.number().max(10, 'Please enter less than 10 people.'),
        time_15_16: z.number().max(10, 'Please enter less than 10 people.'),
        time_16_17: z.number().max(10, 'Please enter less than 10 people.'),
        time_17_18: z.number().max(10, 'Please enter less than 10 people.'),
        time_18_19: z.number().max(10, 'Please enter less than 10 people.'),
        time_19_20: z.number().max(10, 'Please enter less than 10 people.'),
        time_20_21: z.number().max(10, 'Please enter less than 10 people.'),
        time_21_22: z.number().max(10, 'Please enter less than 10 people.'),
        time_22_23: z.number().max(10, 'Please enter less than 10 people.'),
      }),
      tue: z.object({
        time_11_12: z.number().max(10, 'Please enter less than 10 people.'),
        time_12_13: z.number().max(10, 'Please enter less than 10 people.'),
        time_13_14: z.number().max(10, 'Please enter less than 10 people.'),
        time_14_15: z.number().max(10, 'Please enter less than 10 people.'),
        time_15_16: z.number().max(10, 'Please enter less than 10 people.'),
        time_16_17: z.number().max(10, 'Please enter less than 10 people.'),
        time_17_18: z.number().max(10, 'Please enter less than 10 people.'),
        time_18_19: z.number().max(10, 'Please enter less than 10 people.'),
        time_19_20: z.number().max(10, 'Please enter less than 10 people.'),
        time_20_21: z.number().max(10, 'Please enter less than 10 people.'),
        time_21_22: z.number().max(10, 'Please enter less than 10 people.'),
        time_22_23: z.number().max(10, 'Please enter less than 10 people.'),
      }),
      wed: z.object({
        time_11_12: z.number().max(10, 'Please enter less than 10 people.'),
        time_12_13: z.number().max(10, 'Please enter less than 10 people.'),
        time_13_14: z.number().max(10, 'Please enter less than 10 people.'),
        time_14_15: z.number().max(10, 'Please enter less than 10 people.'),
        time_15_16: z.number().max(10, 'Please enter less than 10 people.'),
        time_16_17: z.number().max(10, 'Please enter less than 10 people.'),
        time_17_18: z.number().max(10, 'Please enter less than 10 people.'),
        time_18_19: z.number().max(10, 'Please enter less than 10 people.'),
        time_19_20: z.number().max(10, 'Please enter less than 10 people.'),
        time_20_21: z.number().max(10, 'Please enter less than 10 people.'),
        time_21_22: z.number().max(10, 'Please enter less than 10 people.'),
        time_22_23: z.number().max(10, 'Please enter less than 10 people.'),
      }),
      thu: z.object({
        time_11_12: z.number().max(10, 'Please enter less than 10 people.'),
        time_12_13: z.number().max(10, 'Please enter less than 10 people.'),
        time_13_14: z.number().max(10, 'Please enter less than 10 people.'),
        time_14_15: z.number().max(10, 'Please enter less than 10 people.'),
        time_15_16: z.number().max(10, 'Please enter less than 10 people.'),
        time_16_17: z.number().max(10, 'Please enter less than 10 people.'),
        time_17_18: z.number().max(10, 'Please enter less than 10 people.'),
        time_18_19: z.number().max(10, 'Please enter less than 10 people.'),
        time_19_20: z.number().max(10, 'Please enter less than 10 people.'),
        time_20_21: z.number().max(10, 'Please enter less than 10 people.'),
        time_21_22: z.number().max(10, 'Please enter less than 10 people.'),
        time_22_23: z.number().max(10, 'Please enter less than 10 people.'),
      }),
      fri: z.object({
        time_11_12: z.number().max(10, 'Please enter less than 10 people.'),
        time_12_13: z.number().max(10, 'Please enter less than 10 people.'),
        time_13_14: z.number().max(10, 'Please enter less than 10 people.'),
        time_14_15: z.number().max(10, 'Please enter less than 10 people.'),
        time_15_16: z.number().max(10, 'Please enter less than 10 people.'),
        time_16_17: z.number().max(10, 'Please enter less than 10 people.'),
        time_17_18: z.number().max(10, 'Please enter less than 10 people.'),
        time_18_19: z.number().max(10, 'Please enter less than 10 people.'),
        time_19_20: z.number().max(10, 'Please enter less than 10 people.'),
        time_20_21: z.number().max(10, 'Please enter less than 10 people.'),
        time_21_22: z.number().max(10, 'Please enter less than 10 people.'),
        time_22_23: z.number().max(10, 'Please enter less than 10 people.'),
      }),
      sat: z.object({
        time_11_12: z.number().max(10, 'Please enter less than 10 people.'),
        time_12_13: z.number().max(10, 'Please enter less than 10 people.'),
        time_13_14: z.number().max(10, 'Please enter less than 10 people.'),
        time_14_15: z.number().max(10, 'Please enter less than 10 people.'),
        time_15_16: z.number().max(10, 'Please enter less than 10 people.'),
        time_16_17: z.number().max(10, 'Please enter less than 10 people.'),
        time_17_18: z.number().max(10, 'Please enter less than 10 people.'),
        time_18_19: z.number().max(10, 'Please enter less than 10 people.'),
        time_19_20: z.number().max(10, 'Please enter less than 10 people.'),
        time_20_21: z.number().max(10, 'Please enter less than 10 people.'),
        time_21_22: z.number().max(10, 'Please enter less than 10 people.'),
        time_22_23: z.number().max(10, 'Please enter less than 10 people.'),
      }),
      sun: z.object({
        time_11_12: z.number().max(10, 'Please enter less than 10 people.'),
        time_12_13: z.number().max(10, 'Please enter less than 10 people.'),
        time_13_14: z.number().max(10, 'Please enter less than 10 people.'),
        time_14_15: z.number().max(10, 'Please enter less than 10 people.'),
        time_15_16: z.number().max(10, 'Please enter less than 10 people.'),
        time_16_17: z.number().max(10, 'Please enter less than 10 people.'),
        time_17_18: z.number().max(10, 'Please enter less than 10 people.'),
        time_18_19: z.number().max(10, 'Please enter less than 10 people.'),
        time_19_20: z.number().max(10, 'Please enter less than 10 people.'),
        time_20_21: z.number().max(10, 'Please enter less than 10 people.'),
        time_21_22: z.number().max(10, 'Please enter less than 10 people.'),
        time_22_23: z.number().max(10, 'Please enter less than 10 people.'),
      }),
    })

})
.superRefine((value, ctx) => {
  const beforeValue = value.beforeValue;
  delete value.beforeValue;
  if (beforeValue === JSON.stringify(value)) {
    ctx.addIssue({
      path: ['beforeValue'],
      code: 'custom',
      message: 'There is not modify.',
    })
  }
})
;

export type CapacityList = {
  mon: {
    time_11_12: number;
    time_12_13: number;
    time_13_14: number;
    time_14_15: number;
    time_15_16: number;
    time_16_17: number;
    time_17_18: number;
    time_18_19: number;
    time_19_20: number;
    time_20_21: number;
    time_21_22: number;
    time_22_23: number;
  },
  tue: {
    time_11_12: number;
    time_12_13: number;
    time_13_14: number;
    time_14_15: number;
    time_15_16: number;
    time_16_17: number;
    time_17_18: number;
    time_18_19: number;
    time_19_20: number;
    time_20_21: number;
    time_21_22: number;
    time_22_23: number;
  },
  wed: {
    time_11_12: number;
    time_12_13: number;
    time_13_14: number;
    time_14_15: number;
    time_15_16: number;
    time_16_17: number;
    time_17_18: number;
    time_18_19: number;
    time_19_20: number;
    time_20_21: number;
    time_21_22: number;
    time_22_23: number;
  },
  thu: {
    time_11_12: number;
    time_12_13: number;
    time_13_14: number;
    time_14_15: number;
    time_15_16: number;
    time_16_17: number;
    time_17_18: number;
    time_18_19: number;
    time_19_20: number;
    time_20_21: number;
    time_21_22: number;
    time_22_23: number;
  },
  fri: {
    time_11_12: number;
    time_12_13: number;
    time_13_14: number;
    time_14_15: number;
    time_15_16: number;
    time_16_17: number;
    time_17_18: number;
    time_18_19: number;
    time_19_20: number;
    time_20_21: number;
    time_21_22: number;
    time_22_23: number;
  },
  sat: {
    time_11_12: number;
    time_12_13: number;
    time_13_14: number;
    time_14_15: number;
    time_15_16: number;
    time_16_17: number;
    time_17_18: number;
    time_18_19: number;
    time_19_20: number;
    time_20_21: number;
    time_21_22: number;
    time_22_23: number;
  },
  sun: {
    time_11_12: number;
    time_12_13: number;
    time_13_14: number;
    time_14_15: number;
    time_15_16: number;
    time_16_17: number;
    time_17_18: number;
    time_18_19: number;
    time_19_20: number;
    time_20_21: number;
    time_21_22: number;
    time_22_23: number;
  },
};

export type LoaderReturnValue = {
  name: string;
  courses: {
    id: string;
    name: string;
    time_range: string;
  }[],
  capacity_list: {
    single: CapacityList,
    group: CapacityList,
  }
};
