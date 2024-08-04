import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Input,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';

interface MutliSelectProps {
  values: string[];
  options: string[];
  onChange: (values: string[]) => void;
}

export function MultiSelect(props: MutliSelectProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const options = props.options.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon boxSize={5} />}>
        {props.values.length === 0
          ? 'Select...'
          : props.values.length === 1
            ? props.values[0]
            : props.values.length + ' selected'}
      </MenuButton>
      <MenuList
        onKeyDown={(e) => {
          const key = e.key;
          const isAlphanumeric = /^[a-z0-9]$/i.test(key);
          // Focus search bar if the user starts typing something
          if (isAlphanumeric) {
            e.preventDefault();
            e.stopPropagation();
            if (
              inputRef.current &&
              inputRef.current !== document.activeElement
            ) {
              setSearchQuery(searchQuery + key);
              inputRef.current.focus();
            }
          }
          if (key === 'Backspace') {
            if (
              inputRef.current &&
              inputRef.current !== document.activeElement
            ) {
              inputRef.current.focus();
            }
          }
        }}>
        <Box
          paddingX={2}
          paddingBottom={2}
          onKeyDown={(e) => e.stopPropagation()}>
          <Input
            ref={inputRef}
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
        </Box>
        {options.map((option) => {
          return (
            <MenuItemOption
              key={option}
              isChecked={props.values.includes(option)}
              closeOnSelect={false}
              onClick={() => {
                if (props.values.includes(option)) {
                  props.onChange(
                    props.values.filter((value) => value !== option),
                  );
                } else {
                  props.onChange([...props.values, option]);
                }
              }}>
              {option}
            </MenuItemOption>
          );
        })}
        {options.length === 0 && searchQuery.length > 0 && (
          <Text paddingX={3} paddingY={2}>
            No results for <strong>{searchQuery}</strong>
          </Text>
        )}
      </MenuList>
    </Menu>
  );
}
