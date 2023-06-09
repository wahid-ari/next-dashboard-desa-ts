import { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import { ArrowSmRightIcon } from '@heroicons/react/outline';
import { tabledata } from '@data/tableData';
import * as yup from 'yup';
import useToast from '@utils/useToast';
import Layout from '@components/layout/Layout';
import Badge from '@components/systems/Badge';
import Button from '@components/systems/Button';
import Card from '@components/systems/Card';
import Checkbox from '@components/systems/Checkbox';
import Code from '@components/systems/Code';
import Container from '@components/systems/Container';
import Dialog from '@components/systems/Dialog';
import FileInput from '@components/systems/FileInput';
import Heading from '@components/systems/Heading';
import Input from '@components/systems/Input';
import InputDebounce from '@components/systems/InputDebounce';
import Label from '@components/systems/Label';
import LabeledInput from '@components/systems/LabeledInput';
import LinkButton from '@components/systems/LinkButton';
import Modal from '@components/systems/Modal';
import Progress from '@components/systems/Progress';
import Radio from '@components/systems/Radio';
import ReactTable from '@components/systems/ReactTable';
import SearchBox from '@components/systems/SearchBox';
import Section from '@components/systems/Section';
import SelectBox from '@components/systems/SelectBox';
import SelectNative from '@components/systems/SelectNative';
import Shimer from '@components/systems/Shimer';
import Table from '@components/systems/Table';
import Tabs from '@components/systems/Tabs';
import Text from '@components/systems/Text';
import TextArea from '@components/systems/TextArea';
import Title from '@components/systems/Title';
import Wrapper from '@components/systems/Wrapper';
import Select from 'react-select';

const searchBoxData = [
  {
    id: 1,
    name: 'Option 1',
  },
  {
    id: 2,
    name: 'Option 2',
  },
  {
    id: 3,
    name: 'Option 3',
  },
];

const selectBoxData = [
  { id: 1, name: 'Red' },
  { id: 2, name: 'Green' },
  { id: 3, name: 'Blue' },
  { id: 4, name: 'Orange' },
  { id: 5, name: 'Yellow' },
  { id: 6, name: 'Purple' },
];

export default function Example() {
  const [inputDebounceValue, setInputDebounceValue] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDangerDialog, setOpenDangerDialog] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { updateToast, pushToast, dismissToast } = useToast();
  const [user, setUser] = useState({
    username: '',
    email: '',
    angka: '',
    angka_positif: '',
  });

  const [selectedColor, setSelectedColor] = useState('blue');
  function handleSelectColor(e: any) {
    setSelectedColor(e.target.value);
  }

  function addToast() {
    pushToast({ message: 'This is a toast message', isError: false });
  }

  function addToastError() {
    pushToast({ message: 'This is a toast message', isError: true });
  }

  function toastAsync() {
    const toastId = pushToast({
      message: 'Loading Posting Data',
      isLoading: true,
    });
    setTimeout(() => {
      updateToast({ toastId, message: 'Posting Data Success', isError: false });
    }, 3000);
  }

  const userSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username harus diisi')
      .matches(/^[A-Za-z]+$/, 'Username harus berupa huruf'),
    email: yup.string().email('Email harus valid').required('Email harus diisi').typeError('Email harus validwetewt'),
    angka: yup
      .number()
      .required('Angka harus diisi')
      .integer('Angka harus berupa integer bukan float')
      .typeError('Angka harus valid'),
    angka_positif: yup
      .number()
      .required('Angka harus diisi')
      .positive('Angka harus positif')
      .integer('Angka harus berupa integer bukan float')
      .typeError('Angka harus valid'),
  });

  async function checker(schema: any, param: any) {
    try {
      await schema.validate(param, { abortEarly: false });
      return { valid: true };
    } catch (err) {
      return { valid: false, errors: err.errors };
    }
  }

  async function checkValid() {
    try {
      const { valid, errors } = await checker(userSchema, user);
      if (!valid && errors) {
        dismissToast();
        errors.forEach((el: any) => {
          pushToast({ message: el, isError: true });
        });
      }
      console.log(valid);
    } catch (e) {
      console.error(e);
    }
  }

  function handleUserChange(e: any) {
    setUser({ ...user, [e.currentTarget.name]: e.currentTarget.value });
  }

  function onNext() {}

  function onPrev() {}

  const [selectedSearchBox, setSelectedSearchBox] = useState();
  const [querySearchBox, setQuerySearchBox] = useState('');
  const filteredSearchBox =
    querySearchBox === ''
      ? searchBoxData
      : searchBoxData.filter((item) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(querySearchBox.toLowerCase().replace(/\s+/g, ''))
        );

  const column = useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'id',
        width: 300,
        Cell: (row) => {
          return row.cell.row.index + 1;
        },
      },
      {
        Header: 'Name',
        accessor: 'name',
        width: 300,
        Cell: (row) => {
          const { values, original } = row.cell.row;
          return (
            <Link
              href={`#`}
              className='rounded text-sm font-medium text-sky-500 hover:text-sky-600 focus:outline-none focus:ring-1 focus:ring-sky-400'
            >
              {values.name}
            </Link>
          );
        },
      },
      {
        Header: 'Email',
        accessor: 'email',
        width: 300,
      },
      {
        Header: 'Action',
        disableSortBy: true,
        width: 300,
        Cell: (row) => {
          const { values, original } = row.cell.row;
          // console.log(`${values.id} - ${values.name} - ${original.cover} - ${original.artists.id} - ${original.artists.name}`)
          return (
            <div>
              <Link
                href={`#`}
                className='mr-2 rounded bg-sky-600 px-[6px] py-[3px] text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400'
              >
                Edit
              </Link>
              <Button.danger
                className='!px-[6px] !py-[2px]'
                // onClick={() => handleShowDeleteModal(values.id, values.name)}
              >
                Delete
              </Button.danger>
            </div>
          );
        },
      },
    ],
    []
  );

  const tableInstance = useRef(null);

  const reactSelectData = [
    {
      value: 1,
      label: 'Option 1',
    },
    {
      value: 2,
      label: 'Option 2',
    },
    {
      value: 3,
      label: 'Option 3',
    },
  ];

  const [reactSelect, setReactSelect] = useState();

  const [selectedBox, setSelectedBox] = useState();

  const [file, setFile] = useState({ name: '' });
  function handleFileChange(e: any) {
    setFile({ ...file, name: e.target.files[0].name, [e.target.name]: e.target.files[0] });
  }

  return (
    <Layout title='Design System'>
      <div className='relative'>
        <Title>Example</Title>
        <span className='absolute left-[105px] top-1 flex h-5 w-5 animate-bounce items-center justify-center'>
          <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75' />
          <span className='relative inline-flex h-3 w-3 rounded-full bg-sky-500' />
        </span>
      </div>

      <Wrapper id='tableofcontent' name='Table of Content' noChildren noClassName noProps>
        <div className='columns-2 text-blue-600 dark:text-sky-500 sm:columns-3'>
          <span className='mb-3 block underline'>
            <Link href='#validation'>Validation (yup)</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#code'>Code</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#modal'>Modal</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#dialog'>Dialog</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#searchbox'>SearchBox</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#selectbox'>SelectBox</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#reactselect'>React Select</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#reacttable'>React Table</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#usetoast'>useToast (hook)</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#badge'>Badge</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#button'>Button</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#linkbutton'>LinkButton</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#checkbox'>Checkbox</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#container'>Container</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#heading'>Heading</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#input'>Input</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#inputdisabled'>Input.disabled</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#fileinput'>FileInput</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#label'>Label</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#labeledinput'>LabeledInput</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#labeledinputdisabled'>LabeledInput.disabled</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#inputdebounce'>InputDebounce</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#textarea'>TextArea</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#selectnative'>SelectNative</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#selectnativeoption'>SelectNative.option</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#progress'>Progress</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#radio'>Radio</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#shimer'>Shimer</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#tabs'>Tabs</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#tabspanel'>Tabs.panel</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#table'>Table</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#tabletr'>Table.tr</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#tabletd'>Table.td</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#text'>Text</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#card'>Card</Link>
          </span>
          <span className='mb-3 block underline'>
            <Link href='#section'>Section</Link>
          </span>
        </div>
      </Wrapper>

      <Wrapper id='validation' name='Validation' noChildren noClassName noProps hideProps>
        <LabeledInput
          label='Username'
          name='username'
          value={user.username}
          placeholder='Username'
          onChange={handleUserChange}
        />
        <LabeledInput label='Email' name='email' value={user.email} placeholder='Email' onChange={handleUserChange} />
        <LabeledInput label='Angka' name='angka' value={user.angka} placeholder='Angka' onChange={handleUserChange} />
        <LabeledInput
          label='Angka Positif'
          name='angka_positif'
          value={user.angka_positif}
          placeholder='Number Positif'
          onChange={handleUserChange}
        />
        <Button onClick={checkValid}>Submit</Button>
      </Wrapper>

      <Wrapper id='code' name='Code' noChildren props={['name', 'code', 'lang']}>
        <Code
          code={`<Code code={'import useToast from '@utils/useToast()'

    const { updateToast, pushToast, dismissToast } = useToast();

    function toastAsync() {
      const toastId = pushToast({
        message: "Loading Posting Data",
        isLoading: true,
      });
      setTimeout(() => {
        updateToast({ toastId, message: "Posting Data Success", isError: false });
      }, 3000);
    };
  '}
/>`}
        />
        <br />
        <Code
          name='Render'
          code={`import useToast from '@utils/useToast()'

const { updateToast, pushToast, dismissToast } = useToast();

function toastAsync() {
  const toastId = pushToast({
    message: "Loading Posting Data",
    isLoading: true,
  });
  setTimeout(() => {
    updateToast({ toastId, message: "Posting Data Success", isError: false });
  }, 3000);
};`}
        />
      </Wrapper>

      <Wrapper
        id='modal'
        name='Modal'
        noClassName
        noProps
        props={['open', 'title', 'children', 'isDanger', 'onClose', 'onConfirm', 'showIcon']}
      >
        <Button onClick={() => setOpenModal(true)}>Open Modal</Button>

        <Modal
          open={openModal}
          title='Confirmation'
          onClose={() => setOpenModal(false)}
          onConfirm={() => setOpenModal(false)}
          showIcon
        >
          Enim esse esse voluptate cupidatat nulla ipsum cillum incididunt. Voluptate aliquip duis cupidatat incididunt
          incididunt velit velit ut minim enim. Cupidatat nulla ullamco occaecat enim fugiat fugiat non commodo et
          deserunt nisi. Do officia duis id cillum adipisicing.
        </Modal>
      </Wrapper>

      <Wrapper
        id='dialog'
        name='Dialog'
        noClassName
        noProps
        props={['open', 'setOpen', 'title', 'isDanger', 'onClose', 'onConfirm', 'showIcon']}
      >
        <Button onClick={() => setOpenDialog(true)}>Open Dialog</Button>
        <br />
        <br />

        <Dialog
          title='Confirmation'
          open={openDialog}
          showIcon
          setOpen={setOpenDialog}
          onClose={() => setOpenDialog(false)}
          onConfirm={() => setOpenDialog(false)}
        >
          Mollit incididunt ex exercitation sunt incididunt culpa reprehenderit esse magna laborum. Do velit ipsum
          consectetur aliquip mollit nisi irure quis Lorem eu non sit.
        </Dialog>

        <Button.danger onClick={() => setOpenDangerDialog(true)}>Open Danger Dialog</Button.danger>

        <Dialog
          title='Delete Confirmation'
          open={openDangerDialog}
          showIcon
          isDanger
          setOpen={setOpenDangerDialog}
          onClose={() => setOpenDangerDialog(false)}
          onConfirm={() => setOpenDangerDialog(false)}
        >
          Danger Content Fugiat consectetur nulla qui veniam. Aliquip ipsum dolore eiusmod Lorem ipsum fugiat.
        </Dialog>
      </Wrapper>

      <Wrapper
        id='searchbox'
        name='SearchBox'
        noClassName
        noProps
        noChildren
        props={['label', 'value', 'placeholder', 'onChange', 'query', 'onChangeQuery', 'afterLeave', 'filtered']}
      >
        <SearchBox
          label='Search Box'
          value={selectedSearchBox}
          placeholder='Search or Select'
          onChange={setSelectedSearchBox}
          onChangeQuery={(e) => setQuerySearchBox(e.target.value)}
          afterLeave={() => setQuerySearchBox('')}
          filtered={filteredSearchBox}
          query={querySearchBox}
        />
      </Wrapper>

      <Wrapper
        id='selectbox'
        name='SelectBox'
        noClassName
        noProps
        noChildren
        props={['label', 'value', 'placeholder', 'onChange', 'options', 'placeholder']}
      >
        <SelectBox
          placeholder='Select'
          label='Select Box'
          value={selectedBox}
          // @ts-ignore
          onChange={setSelectedBox}
          options={selectBoxData}
        ></SelectBox>
      </Wrapper>

      <Wrapper
        id='reactselect'
        name='ReactSelect'
        noProps
        noChildren
        props={[
          'options',
          'isMulti',
          'noOptionsMessage',
          'value',
          'onChange',
          'placeholder',
          'name',
          'classNamePrefix',
          'theme',
        ]}
      >
        <label htmlFor='category' className='mb-2 block text-sm text-neutral-800 dark:text-gray-200'>
          Category
        </label>
        <Select
          aria-label='React Select'
          // @ts-ignore
          options={reactSelectData}
          isMulti
          noOptionsMessage={() => 'Not Found'}
          value={reactSelect}
          // @ts-ignore
          onChange={setReactSelect}
          placeholder='Search or Select'
          name='category'
          classNames={{
            option: (option) => (option.isSelected ? '!border-red-600' : '!border-grey-300'),
          }}
          classNamePrefix='react-select'
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: `#0EA5E9`,
              primary25: `#0EA5E9`,
              primary50: `#0EA5E9`,
              neutral40: `#EF4444`,
            },
          })}
        />
      </Wrapper>

      <Wrapper
        id='reacttable'
        name='React Table'
        props={['columns', 'data', 'page_size', 'bordered', 'itemPerPage', 'ref']}
        noProps
        noWrap
        noChildren
      >
        <LabeledInput
          label='Search Data'
          id='caridata'
          name='caridata'
          placeholder='Keyword'
          className='max-w-xs !py-2'
          onChange={(e) => {
            tableInstance.current.setGlobalFilter(e.target.value);
          }}
        />
        <ReactTable columns={column} data={tabledata} ref={tableInstance} page_size={5} />
      </Wrapper>

      <Wrapper id='usetoast' name='useToast (hook)' noProps noChildren noClassName hideProps>
        <Code
          code={`import useToast from '@utils/useToast()'

const { updateToast, pushToast, dismissToast } = useToast();

function addToast() {
  pushToast({ message: "This is a toast message", isError: false });
};

function addToastError() {
  pushToast({ message: "This is a toast message", isError: true });};

function toastAsync() {
  const toastId = pushToast({
    message: "Loading Posting Data",
    isLoading: true,
  });
  setTimeout(() => {
    updateToast({ toastId, message: "Posting Data Success", isError: false });
  }, 3000);
};

function dissmissAllToast() {
  dismissToast()
}`}
        />
      </Wrapper>

      <div className='flex flex-wrap items-center gap-2'>
        <Button onClick={addToast}>Show Me Toast</Button>
        <Button onClick={addToastError}>Show Me Error Toast</Button>
        <Button onClick={toastAsync}>Toast with async</Button>
        <Button onClick={() => dismissToast()}>Dismiss all Toast</Button>
      </div>

      <Wrapper
        id='badge'
        name='Badge'
        variant={['dark', 'red', 'green', 'yellow', 'indigo', 'pink']}
        props={['isLarge']}
      >
        <div className='flex flex-wrap items-center gap-y-2'>
          <Badge>blue</Badge>
          <Badge.dark>dark</Badge.dark>
          <Badge.red>red</Badge.red>
          <Badge.green>green</Badge.green>
          <Badge.yellow>yellow</Badge.yellow>
          <Badge.indigo>indigo</Badge.indigo>
          <Badge.purple>purple</Badge.purple>
          <Badge.pink>pink</Badge.pink>
        </div>
        <br />
        <br />
        <div className='flex flex-wrap items-center gap-y-2'>
          <Badge isLarge>blue</Badge>
          <Badge.dark isLarge>dark</Badge.dark>
          <Badge.red isLarge>red</Badge.red>
          <Badge.green isLarge>green</Badge.green>
          <Badge.yellow isLarge>yellow</Badge.yellow>
          <Badge.indigo isLarge>indigo</Badge.indigo>
          <Badge.purple isLarge>purple</Badge.purple>
          <Badge.pink isLarge>pink</Badge.pink>
        </div>
      </Wrapper>

      <Wrapper
        id='button'
        name='Button'
        variant={['success', 'danger', 'secondary', 'tertary']}
        props={['type', 'value', 'disabled', 'onClick']}
      >
        <div className='flex flex-wrap items-center gap-2'>
          <Button>Primary</Button>
          <Button.success>Success</Button.success>
          <Button.danger className='flex items-center gap-2'>
            <ArrowSmRightIcon className='h-4 w-4' />
            Danger
          </Button.danger>
          <Button.secondary>Secondary</Button.secondary>
          <Button.tertary>Tertary</Button.tertary>
          <Button disabled>Disabled</Button>
        </div>
      </Wrapper>

      <Wrapper id='linkbutton' name='LinkButton' variant={['secondary', 'tertary']} props={['href']}>
        <div className='flex flex-wrap items-center gap-2'>
          <LinkButton href='/' className='flex items-center gap-2'>
            <ArrowSmRightIcon className='h-5 w-5' />
            TambahLink to some page
          </LinkButton>
          <LinkButton.secondary href='/'>Link to some page</LinkButton.secondary>
          <LinkButton.tertary href='/'>Link to some page</LinkButton.tertary>
        </div>
      </Wrapper>

      <Wrapper
        id='checkbox'
        name='Checkbox'
        variant={['disabled']}
        props={['name', 'label', 'value', 'onChange', 'defaultChecked']}
        noClassName
        noChildren
      >
        <Checkbox name='checkbox 1' label='Checkbox' />
        <Checkbox.disabled name='Disabled Checkbox' />
        <Checkbox.disabled name='Disabled Checked Checkbox' defaultChecked />
      </Wrapper>

      <Wrapper id='container' name='Container' props={['small']}>
        <Container>
          <Text>Content</Text>
        </Container>
      </Wrapper>

      <Wrapper id='heading' name='Heading' props={['h1', 'h2', 'h3']}>
        <Heading h1>Heading 1</Heading>
        <Heading h2>Heading 2</Heading>
        <Heading h3>Heading 3</Heading>
        <Heading>Heading 4 (default)</Heading>
      </Wrapper>

      <Wrapper id='input' name='Input' props={['type', 'name', 'placeholder', 'value', 'onChange']} noChildren>
        <Input name='input' placeholder='Input default' />
      </Wrapper>

      <Wrapper
        id='inputdisabled'
        name='Input.disabled'
        props={['type', 'name', 'placeholder', 'defaultValue']}
        noChildren
      >
        <Input.disabled name='input' placeholder='Input default' defaultValue='Has a value' />
      </Wrapper>

      <Wrapper
        id='fileinput'
        name='FileInput'
        props={['id', 'className', 'label', 'name', 'value', 'onChange']}
        noChildren
      >
        <FileInput label='File' name='File' value={file ? file.name : ''} onChange={handleFileChange} accept='.pdf' />
      </Wrapper>

      <Wrapper id='label' name='Label'>
        <Label>Ut deserunt do est irure.</Label>
      </Wrapper>

      <Wrapper
        id='labeledinput'
        name='LabeledInput'
        props={['id', 'label', 'name', 'type', 'placeholder', 'value', 'onChange']}
        noChildren
      >
        <LabeledInput label='Email' name='email' placeholder='Email' type='text' />
        <LabeledInput label='Password' name='password' placeholder='Your Password' type='password' />
      </Wrapper>

      <Wrapper
        id='labeledinputdisabled'
        name='LabeledInput.disabled'
        props={['label', 'type', 'name', 'placeholder', 'defaultValue']}
        noChildren
      >
        <LabeledInput.disabled
          label='Confirmation Password'
          name='confirmation'
          placeholder='confirmation'
          type='password'
        />
      </Wrapper>

      <Wrapper
        id='inputdebounce'
        name='InputDebounce'
        props={[
          'id',
          'label',
          'type',
          'name',
          'placeholder',
          'value',
          'onChange',
          'className',
          'wrapperClassName',
          'debounce',
        ]}
        noChildren
      >
        <InputDebounce
          label='Input Debounce'
          name='inputdebounce'
          placeholder='Input Debounce'
          value={inputDebounceValue}
          onChange={(value) => setInputDebounceValue(value)}
        />
        <Text>{inputDebounceValue}</Text>
      </Wrapper>

      <Wrapper
        id='textarea'
        name='TextArea'
        props={['label', 'className', 'id', 'name', 'placeholder', 'value', 'onChange', 'height', '...props']}
        noChildren
      >
        <TextArea label='TextArea' name='textarea' placeholder='text area' />
      </Wrapper>

      <Wrapper id='selectnative' name='SelectNative' props={['label', 'id', 'name', 'value', 'onChange']}>
        <SelectNative
          label='Select Color'
          id='color'
          name='color'
          value={selectedColor ? selectedColor : 'Choose Color'}
          onChange={handleSelectColor}
        >
          <SelectNative.option value='red'>Red</SelectNative.option>
          <SelectNative.option value='blue'>Blue</SelectNative.option>
          <SelectNative.option value='green'>Green</SelectNative.option>
        </SelectNative>
      </Wrapper>

      <Wrapper id='selectnativeoption' name='SelectNative.option' props={['value']} noClassName>
        <SelectNative.option value='red'>Red</SelectNative.option>
        <SelectNative.option value='blue'>Blue</SelectNative.option>
      </Wrapper>

      <Wrapper id='progress' name='Progress' variant={['percentage']} props={['percent']} noChildren noProps>
        <Progress percent={45} />
        <br />
        <Progress.percentage percent={0} />
        <br />
        <Progress.percentage percent={75} />
      </Wrapper>

      <Wrapper
        id='radio'
        name='Radio'
        variant={['disabled']}
        props={['name', 'label', 'value', 'onChange', 'checked']}
        noClassName
        noChildren
      >
        <Radio name='radio' label='Blue' />
        <Radio name='radio' label='Red' />
        <Radio.disabled name='radios' label='Disabled Radio' />
        <Radio.disabled name='radios' label='Disabled Checked Radio' defaultChecked />
      </Wrapper>

      <Wrapper id='shimer' name='Shimer' noChildren noProps>
        <Shimer className='max-w-[5rem]' />
        <Shimer className='max-w-[10rem]' />
        <Shimer className='max-w-[15rem]' />
      </Wrapper>

      <Wrapper id='tabs' name='Tabs' props={['items']}>
        <Tabs items={['Tab A', 'Tab B', 'Tab C']}>
          <Tabs.panel>
            <Heading className='mb-0'>Tab Content A</Heading>
          </Tabs.panel>
          <Tabs.panel>
            <Heading className='mb-0'>Tab Content B</Heading>
          </Tabs.panel>
          <Tabs.panel>
            <Heading className='mb-0'>Tab Content C</Heading>
          </Tabs.panel>
        </Tabs>
      </Wrapper>

      <Wrapper id='tabitem' name='Tabs.panel' noProps>
        <Tabs items={['Tab']}>
          <Tabs.panel>
            <Heading className='mb-0'>Tabs Panel</Heading>
          </Tabs.panel>
        </Tabs>
      </Wrapper>

      <Wrapper
        id='table'
        name='Table'
        props={['head', 'totalPage', 'totalData', 'currentPage', 'next', 'prev']}
        noProps
        noWrap
      >
        <Table
          totalPage={5}
          totalData={50}
          currentPage={1}
          next={onNext}
          prev={onPrev}
          head={
            <>
              <Table.td shrink>No</Table.td>
              <Table.td>Column 1</Table.td>
              <Table.td>Column 2</Table.td>
              <Table.td>Column 3</Table.td>
              <Table.td>Column 4</Table.td>
              <Table.td>Column 5</Table.td>
              <Table.td>Column 6</Table.td>
              <Table.td>Column 7</Table.td>
              <Table.td>Column 8</Table.td>
            </>
          }
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((e, index) => {
            return (
              <Table.tr key={index}>
                <Table.td shrink>{index + 1}</Table.td>
                <Table.td>
                  <Badge>badge</Badge>
                </Table.td>
                <Table.td>
                  <Badge.red>badge red</Badge.red>
                </Table.td>
                <Table.td>
                  <Badge.dark>badge dark</Badge.dark>
                </Table.td>
                <Table.td>
                  <Badge.green>badge green</Badge.green>
                </Table.td>
                <Table.td>
                  <Badge.yellow>badge yellow</Badge.yellow>
                </Table.td>
                <Table.td>
                  <Badge.indigo>badge indigo</Badge.indigo>
                </Table.td>
                <Table.td>
                  <Badge.purple>badge purple</Badge.purple>
                </Table.td>
                <Table.td>
                  <Badge.pink>badge pink</Badge.pink>
                </Table.td>
              </Table.tr>
            );
          })}
        </Table>
      </Wrapper>

      <Wrapper id='tabletr' name='Table.tr' noWrap />

      <Wrapper id='tabletd' name='Table.td' props={['shrink']} noWrap />

      <Wrapper id='text' name='Text' variant={['light', 'medium', 'semibold', 'bold', 'extrabold']}>
        <Text.light className='mb-2'>Light</Text.light>
        <Text className='mb-2'>Default</Text>
        <Text.medium className='mb-2'>Medium</Text.medium>
        <Text.semibold className='mb-2'>Semibold</Text.semibold>
        <Text.bold className='mb-2'>Bold</Text.bold>
        <Text.extrabold className='mb-2'>Extrabold</Text.extrabold>
      </Wrapper>

      <Wrapper id='card' name='Card'>
        <Card>
          <Text>Card Content</Text>
        </Card>
      </Wrapper>

      <Wrapper id='section' name='Section' variant={['small']}>
        <Section>
          <Text>Section Default</Text>
        </Section>
        <Section.small>
          <Text>Section Small</Text>
        </Section.small>
      </Wrapper>
    </Layout>
  );
}
