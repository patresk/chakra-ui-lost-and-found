import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonProps,
  Input,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';

interface SelectProps extends Omit<ButtonProps, 'onChange' | 'value'> {
  value: string | null;
  options: string[];
  searchable?: boolean;
  onChange: (value: string) => void;
}

export function Select(props: SelectProps) {
  const { value, options, onChange, searchable = false, ...rest } = props;
  const [searchQuery, setSearchQuery] = useState('');
  const filteredOptions = props.options.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon boxSize={5} />}
        {...rest}>
        {props.value === null ? 'Select...' : props.value}
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
        {searchable && (
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
        )}
        {filteredOptions.map((option) => (
          <MenuItem key={option} onClick={() => props.onChange(option)}>
            {option}
          </MenuItem>
        ))}
        {filteredOptions.length === 0 && searchQuery.length > 0 && (
          <Text paddingX={3} paddingY={2}>
            No results for <strong>{searchQuery}</strong>
          </Text>
        )}
      </MenuList>
    </Menu>
  );
}
