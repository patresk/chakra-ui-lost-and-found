import { useState } from 'react';
import { Select } from '../../components/Select';
import {
  Card,
  ChakraProvider,
  Heading,
  HStack,
  VStack,
  Text,
  useColorMode,
  IconButton,
} from '@chakra-ui/react';
import { MultiSelect } from '../../components/MultiSelect';
import { TagInput } from '../../components/TagsInput';
import { DatePicker } from '../../components/DatePicker';
import { DateInput } from '../../components/DateInput';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export function ColorModeSwitcher() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      variant="ghost"
      aria-label="Switch mode"
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
    />
  );
}

export function Storybook() {
  return (
    <ChakraProvider>
      <VStack gap={4} padding={8} alignItems="flex-start" textAlign="left">
        <Heading size="xl">Chakra UI missing components</Heading>
        <ColorModeSwitcher />
        <Text>
          This storybook showcases the way how you can use these components in
          your code, after you copy the components from `/components` folder to
          your codebase. You can also edit the components directly, and create
          your own abstractions.
        </Text>
        <Heading size="md">Select</Heading>

        <SelectStorybook />

        <Heading size="md">Multi select</Heading>
        <MultiSelectStorybook />
        <Heading size="md">Tag input</Heading>
        <TagInputStorybook />
        {/* <Heading size="md">Nested menu</Heading>
        <NestedMenus /> */}
        <Heading size="md">Date picker</Heading>
        <DatePickerStorybook />
        <Heading size="md"> Date input</Heading>
        <DateInputStorybook />
      </VStack>
    </ChakraProvider>
  );
}

function SelectStorybook() {
  const options = [
    'Aubergine',
    'Apple',
    'Banana',
    'Blueberry',
    'Grapes',
    'Pineapple',
    'Broccoli',
    'Leek',
    'Courgette',
  ];
  const [value, setValue] = useState<string | null>(null);
  return (
    <HStack gap={2}>
      <Select searchable value={value} options={options} onChange={setValue} />
      <Select value={value} options={options} onChange={setValue} size="sm" />
      <Select value={value} options={options} onChange={setValue} size="xs" />
      <Select
        value={value}
        options={options}
        onChange={setValue}
        variant="outline"
      />
      <Select
        value={value}
        options={options}
        onChange={setValue}
        variant="outline"
        size="sm"
      />
      <Select
        value={value}
        options={options}
        onChange={setValue}
        variant="outline"
        size="xs"
      />
    </HStack>
  );
}

export function MultiSelectStorybook() {
  const options = [
    'Aubergine',
    'Apple',
    'Banana',
    'Blueberry',
    'Grapes',
    'Pineapple',
    'Broccoli',
    'Leek',
    'Courgette',
  ];
  const [values, setValues] = useState([options[0]]);
  return <MultiSelect values={values} options={options} onChange={setValues} />;
}

export function TagInputStorybook() {
  const options = [
    'Aubergine',
    'Apple',
    'Banana',
    'Blueberry',
    'Grapes',
    'Pineapple',
    'Broccoli',
    'Leek',
    'Courgette',
  ];
  const [values, setValues] = useState(['Apple', 'Banana']);
  return (
    <HStack gap={2}>
      <TagInput
        maxWidth="420px"
        minWidth="400px"
        values={values}
        options={options}
        onChange={setValues}
      />
      <TagInput
        maxWidth="400px"
        minWidth="400px"
        values={values}
        options={options}
        onChange={setValues}
        size="sm"
      />
    </HStack>
  );
}

const today = new Date();
const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
const yesterday2 = new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000);
const yesterday3 = new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000);

function DatePickerStorybook() {
  const [date1, setDate1] = useState(today);
  const [date2, setDate2] = useState([yesterday3, today]);

  return (
    <HStack gap={2} alignItems="flex-start">
      <Card>
        <DatePicker
          value={date1}
          onChange={(selectedDate) => {
            setDate1(selectedDate as Date);
          }}
        />
      </Card>
      <Card>
        <DatePicker
          monthsToDisplay={2}
          value={date2}
          renderRange={true}
          onChange={(selectedDate) => {
            setDate2(selectedDate as Date[]);
          }}
        />
      </Card>
    </HStack>
  );
}

function DateInputStorybook() {
  const [value, setValue] = useState<Date[] | Date | null>(null);
  return (
    <HStack gap={2}>
      <DateInput
        datePickerProps={{ minDate: yesterday3 }}
        value={value}
        onChange={(date) => setValue(date)}
      />
      <DateInput size="sm" />
      <DateInput size="xs" />
    </HStack>
  );
}

export default Storybook;
