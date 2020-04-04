import React from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Field, FieldRenderProps } from 'react-final-form';
import DayjsUtils from '@date-io/dayjs';

import Error from '../Error';

type Props = FieldRenderProps<string, any> & {
  variant: 'inline';
  margin?: 'normal';
  fullWidth?: boolean;
  id: string;
  label: string;
  name: string;
  autoOk?: boolean;
  defaultValue?: string;
};

const DateField: React.FC<Props> = ({
  variant = 'inline',
  margin = 'normal',
  fullWidth = true,
  id,
  label,
  name,
  autoOk = true,
  defaultValue,
}) => (
  <MuiPickersUtilsProvider utils={DayjsUtils}>
    <Field
      {...{
        name,
        defaultValue,
        render: ({ input, meta: { error, touched } }) => (
          <>
            <DatePicker
              {...{
                variant,
                margin,
                fullWidth,
                id,
                label,
                autoOk,
                ...input,
              }}
            />
            <Error error={error} touched={touched} />
          </>
        ),
      }}
    />
  </MuiPickersUtilsProvider>
);

export default DateField;
