import {
  Button,
  Card,
  ChakraProvider,
  Container,
  Heading,
  Tab,
  TabList,
  TabPanel,
  Text,
  TabPanels,
  Tabs,
  chakra,
  Divider,
  Link,
  IconButton,
  useColorMode,
  ButtonGroup,
  Spacer,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../storybook/Storybook';
import { ArrowDownIcon, createIcon, ExternalLinkIcon } from '@chakra-ui/icons';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  dracula,
  solarizedlight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from 'react';
import { TagInput } from 'src/components/TagsInput';
import { MultiSelect } from 'src/components/MultiSelect';
import { DatePicker } from 'src/components/DatePicker';
import { DateInput } from 'src/components/DateInput';
import { Select } from 'src/components/Select';
import { extendTheme } from '@chakra-ui/react';

function SelectDemo() {
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
    <Select searchable value={value} options={options} onChange={setValue} />
  );
}

function MultiSelectDemo() {
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

function TagInputDemo() {
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
    <TagInput
      maxWidth="400px"
      values={values}
      options={options}
      onChange={setValues}
    />
  );
}

const today = new Date();
const yesterday3 = new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000);

function DatePickerDemo() {
  const [date, setDate] = useState(today);

  return (
    <Card maxWidth="250px">
      <DatePicker
        value={date}
        onChange={(selectedDate) => {
          setDate(selectedDate as Date);
        }}
      />
    </Card>
  );
}

function DateInputDemo() {
  const [value, setValue] = useState<Date[] | Date | null>(null);
  return (
    <DateInput
      maxWidth="400px"
      datePickerProps={{ minDate: yesterday3, monthsToDisplay: 2 }}
      value={value}
      renderRange
      onChange={(date) => setValue(date)}
    />
  );
}

const CodeRenderer = ({ children }) => {
  const { colorMode } = useColorMode();
  const style = colorMode === 'dark' ? dracula : solarizedlight;
  return (
    <SyntaxHighlighter
      language="tsx"
      style={style}
      customStyle={{
        background: 'transparent',
        margin: '0px',
        padding: '0px',
      }}>
      {children}
    </SyntaxHighlighter>
  );
};

const TwitterIcon = createIcon({
  displayName: 'TwitterIcon',
  viewBox: '0 0 512 512',
  path: (
    <path
      fill="currentColor"
      d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
  ),
});

const GithubIcon = createIcon({
  displayName: 'GithubIcon',
  viewBox: '0 0 496 512',
  path: (
    <path
      fill="currentColor"
      d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
  ),
});

function Demo({ example, code }: { example: React.ReactNode; code: string }) {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };
  return (
    <Card marginTop={10}>
      <Tabs variant="unstyled" index={tabIndex} onChange={handleTabsChange}>
        <TabList padding={4}>
          <ButtonGroup isAttached>
            <Tab variant="outline" as={Button} isActive={tabIndex === 0}>
              Example
            </Tab>
            <Tab variant="outline" as={Button} isActive={tabIndex === 1}>
              Code
            </Tab>
          </ButtonGroup>
          <Spacer />
          <ColorModeSwitcher />
        </TabList>
        <Divider />
        <TabPanels>
          <TabPanel>{example}</TabPanel>
          <TabPanel textAlign="left">
            <CodeRenderer>{code}</CodeRenderer>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Card>
  );
}

// Make dark mode default
const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});

export function LandingPage() {
  return (
    <ChakraProvider theme={theme}>
      <Container maxWidth="container.lg" paddingY="200px">
        <Heading
          size="2xl"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          fontWeight="extrabold"
          bgClip="text"
          paddingBottom={6}>
          Chakra UI Lost & Found
        </Heading>
        <Text fontSize="xl" maxWidth="600px">
          Missing some components in Chakra UI? You've just found them!
          <br />A collection of components that you would have ended up
          implementing yourself otherwise. They support your existing theme and
          dark mode out of the box.
        </Text>

        <Button
          size="lg"
          marginTop={6}
          rightIcon={<ArrowDownIcon />}
          as={chakra.a}
          href="#select">
          View components
        </Button>
      </Container>

      <Divider marginY={10} id="select" />

      <Container maxWidth="container.lg" marginY="100px">
        <Heading size="lg">Select</Heading>
        <Text fontSize="md" marginY={3}>
          After opening the select menu, you can navigate with the up/down
          arrows as you could with normal Chakra dropdown. Pressing any
          alphanumeric key while the dropdown is open will trigger a search.
        </Text>
        <Demo
          example={<SelectDemo />}
          code={`const options = [
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
  <Select searchable value={value} options={options} onChange={setValue} />
);`}
        />
      </Container>

      <Container maxWidth="container.lg" marginY="100px">
        <Heading size="lg">Multi select</Heading>
        <Text fontSize="md" marginY={3}>
          The same as select, but it allows selecting multiple values and
          renders a checkbox next to the value if selected.
        </Text>
        <Demo
          example={<MultiSelectDemo />}
          code={`const options = [
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

return (
  <MultiSelect
    values={values}
    options={options}
    onChange={setValues}
  />
);`}
        />
      </Container>

      <Divider marginY={10} id="tag-input" />

      <Container maxWidth="container.lg" marginY="100px">
        <Heading size="lg">Tag input</Heading>
        <Text fontSize="md" marginY={3}>
          It looks like an input field, but when you hit enter, a Tag component
          with the value is added to the list. The container inherits styling
          from the Input component.
        </Text>
        <Demo
          example={<TagInputDemo />}
          code={`const options = [
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
  <TagInput
    maxWidth="400px"
    values={values}
    options={options}
    onChange={setValues}
  />
);`}
        />
      </Container>

      <Divider marginY={10} id="date-picker" />

      <Container maxWidth="container.lg" marginY="100px">
        <Heading size="lg">Date picker</Heading>
        <Text fontSize="md" marginY={3}>
          Supports multiple months, rendering a range, or multiple selected
          values. Built on top of great&nbsp;
          <Link href="https://github.com/deseretdigital/dayzed" isExternal>
            dayzed
            <ExternalLinkIcon
              mx="2px"
              boxSize={4}
              position="relative"
              top="-2px"
            />
          </Link>
          &nbsp;library
        </Text>
        <Demo
          example={<DatePickerDemo />}
          code={`const [date, setDate] = useState(today);

return (
  <Card maxWidth="250px">
    <DatePicker
      value={date}
      onChange={(selectedDate) => {
        setDate(selectedDate as Date);
      }}
    />
  </Card>
);`}
        />
      </Container>

      <Divider marginY={10} id="date-input" />

      <Container maxWidth="container.lg" marginY="100px">
        <Heading size="lg">Date input</Heading>
        <Text fontSize="md" marginY={3}>
          A text input that allows selecting a date from the DatePicker. It also
          supports range selection, multiple dates, and keyboard updates. It
          combines the DatePicker component, rendered in a Popover, with the
          Input component as the trigger.
        </Text>
        <Demo
          example={<DateInputDemo />}
          code={`const [value, setValue] = useState<Date[] | Date | null>(null);
return (
  <DateInput
    datePickerProps={{ minDate: yesterday3 }}
    value={value}
    onChange={(date) => setValue(date)}
  />
);`}
        />
      </Container>

      <Divider marginY={10} />

      <Container
        maxWidth="container.lg"
        alignItems="center"
        textAlign="center"
        paddingY={6}>
        <Link
          href="https://github.com/patresk/chakra-ui-lost-and-found/tree/main/src/components"
          isExternal>
          <Button
            size="lg"
            marginBottom={4}
            color="white"
            bgGradient="linear(to-r, teal.500, green.500)"
            _hover={{
              bgGradient: 'linear(to-r, red.500, yellow.500)',
            }}
            leftIcon={<GithubIcon boxSize={5} />}>
            Download all components
          </Button>
        </Link>
        <Text>
          You will be redirected to Github repository.
          <br />
          Just copy the components you need to your codebase and use it.
          <br />
          Don't forget to leave a star!
        </Text>
      </Container>

      <Divider marginY={10} />

      <Container maxWidth="container.md" marginY={10}>
        <Heading size="lg">FAQ</Heading>
        <Heading size="md" marginTop={6}>
          What do I get by downloading this?
        </Heading>
        <Text fontSize="md" marginTop={6}>
          You'll get a zip file containing the implementation of React
          components above written in Typescript. You can copy them to your
          project and start using them. No strings attached. I've developed and
          tested the components on v2.8.2 of Chakra UI.
        </Text>
        <Heading size="md" marginTop={6}>
          Why not publish this as an npm package?
        </Heading>
        <Text fontSize="md" marginTop={6}>
          Copying and pasting components is easier than installing a package. In
          my experience, these "molecular" or "composite" components are often
          very customized to fit the need of the particular SAAS product (and
          requirements of the designers).
        </Text>
        <Heading size="md" marginTop={6}>
          Who and why did this?
        </Heading>
        <Text fontSize="md" marginTop={6}>
          I'm{' '}
          <Link href="https://x.com/patresk_/" isExternal>
            Patrik
            <ExternalLinkIcon
              mx="2px"
              boxSize={4}
              position="relative"
              top="-2px"
            />
          </Link>
          , software engineer from Prague, currently building{' '}
          <Link href="https://deepnote.com" isExternal>
            Deepnote
            <ExternalLinkIcon
              mx="2px"
              boxSize={4}
              position="relative"
              top="-2px"
            />
          </Link>
          . I've built this collection of components to help other developers
          that have adopted Chakra UI, but were surprised by the lack of
          existence of some components.
        </Text>
      </Container>

      <Container maxWidth="container.md" paddingY={10}>
        <Link href="https://github.com/patresk" isExternal>
          <IconButton
            size="sm"
            variant="ghost"
            icon={<GithubIcon boxSize={5} />}
            aria-label="GitHub"
          />
        </Link>
        <Link href="https://x.com/patresk_/" isExternal>
          <IconButton
            size="sm"
            variant="ghost"
            icon={<TwitterIcon boxSize={5} />}
            aria-label="Twitter"
          />
        </Link>
      </Container>
    </ChakraProvider>
  );
}
