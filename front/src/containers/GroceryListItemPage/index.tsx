import React, { useContext, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useHistory, useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import Button from '../../components/forms/Button';
import TextField from '../../components/forms/TextField';
import DateField from '../../components/forms/DateField';
import GroceryListItemComponent from '../../components/forms/GroceryListItem';
import Form from '../../components/forms/Form';
import APIRequests from '../APIRequests';
import { GlobalContext } from '../App';

const validationSchema = Yup.object<GroceryListItemValidationSchema>().shape({
  name: Yup.string().required('This field is required'),
  quantity: Yup.number()
    .typeError('This field must be a number')
    .required('This field is required'),
  calories: Yup.number()
    .typeError('This field must be a number')
    .required('This field is required'),
  purchaseDate: Yup.date().required('This field is required'),
  expirationDate: Yup.date()
    .required('This field is required')
    .test({
      name: 'after purchase date',
      message: 'Expiration date must be after purchase date',
      test: function(value: string) {
        // @ts-ignore
        const { purchaseDate } = this.options.context.values;

        return !dayjs(value).isBefore(dayjs(purchaseDate));
      }
    }),
  consumptionDate: Yup.date()
    .required('This field is required')
    .test({
      name: 'after purchase date',
      message: 'Expiration date must be after purchase date',
      test: function(value: string) {
        // @ts-ignore
        const { purchaseDate } = this.options.context.values;

        return !dayjs(value).isBefore(dayjs(purchaseDate));
      }
    }),
});

const hydrateFields = (
  fields: { [key: string]: FieldType },
  defaultValues: any,
) => Object.keys(fields).map(key => defaultValues[key] ? {
    ...fields[key],
    fieldProps: {
      ...fields[key].fieldProps,
      defaultValue: defaultValues[key],
    },
  } :
  fields[key]
).sort((a, b) => a.order - b.order);

const fields = {
  name: {
    fieldProps: {
      id: 'name',
      label: 'Name',
      name: 'name',
      autoComplete: 'off',
      defaultValue: '',
    },
    component: TextField,
    order: 1,
  },
  calories: {
    fieldProps: {
      id: 'calories',
      label: 'Calories',
      name: 'calories',
      autoComplete: 'nope',
      defaultValue: '',
    },
    component: TextField,
    order: 2,
  },
  quantity: {
    fieldProps: {
      id: 'quantity',
      label: 'Quantity',
      name: 'quantity',
      autoComplete: 'nope',
      defaultValue: '',
    },
    component: TextField,
    order: 3,
  },
  purchaseDate: {
    fieldProps: {
      id: 'purchaseDate',
      label: 'Purchase Date',
      name: 'purchaseDate',
      autoComplete: 'nope',
      defaultValue: dayjs().format('MM/DD/YYYY'),
    },
    component: DateField,
    order: 4,
  },
  expirationDate: {
    fieldProps: {
      id: 'expirationDate',
      label: 'Expiration Date',
      name: 'expirationDate',
      autoComplete: 'nope',
      defaultValue: dayjs().format('MM/DD/YYYY'),
    },
    component: DateField,
    order: 5,
  },
  consumptionDate: {
    fieldProps: {
      id: 'consumptionDate',
      label: 'Consumption Date',
      name: 'consumptionDate',
      autoComplete: 'nope',
      defaultValue: dayjs().format('MM/DD/YYYY'),
    },
    component: DateField,
    order: 6,
  },
};

const GroceryListItemPage: React.FC<{}> = () => {
  const [defaultValues, setDefaultValues] = useState<GroceryListItemValidationSchema>({});
  const [errors, setErrors] = useState<string[]>([]);
  const history = useHistory();
  const { id } = useParams();
  const { user, items, setItems } = useContext(GlobalContext);
  const buttonText = id ? 'Modify grocery' : 'Add grocery';
  
  const onSubmit = async (values: GroceryListItemValidationSchema) => {
    const requestType = id ? 'PUT' : 'POST';
    const url = id ? `/groceries/${id}` : '/groceries';

    const { errors, id: createdItemId } = await APIRequests.request(
      requestType, 
      url, 
      { ...values, userId: user.id }
    ) || {};

    if (errors) {
      return setErrors(errors);
    }

    if (createdItemId) {
      const createdItem = await APIRequests.request('GET', `/groceries/${createdItemId}`);

      setItems([...items, createdItem]);
    } else {
      const updatedItem = await APIRequests.request('GET', `/groceries/${id}`);

      setItems(items.map(item => item.id == id ? updatedItem : item));
    }

    history.push('/');
  };
  const deleteGrocery = async () => {
    const { errors } = await APIRequests.request('DELETE', `/groceries/${id}`) || {};

    if (errors) {
      return setErrors(errors);
    }
    
    setItems(items.filter(item => item.id != id));
    history.push('/');
  };
  const renderForm: () => React.ReactNode = () => (
    <Form
      {...{
        onSubmit,
        validationSchema,
        fields: hydrateFields(fields, defaultValues),
        submitButton: {
          render: () => (
            <>
              <Button type="submit">{buttonText}</Button>
              {id && <Button type="button" onClick={deleteGrocery}>Delete grocery</Button>}
            </>
          )
        },
        errors,
      }}
    />
  );

  useEffect(() => {
    if (id) {
      APIRequests.request('GET', `/groceries/${id}`).then(setDefaultValues);
    }
  }, [id]);

  return (
    <GroceryListItemComponent renderForm={renderForm}/>
  );
};

export default GroceryListItemPage;
