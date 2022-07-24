import React, { useState } from "react";
import { Form } from "react-bootstrap";

const SearchBox = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  return (
    <>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          id="movieSearch"
          aria-label="Search"
          value={searchValue}
          onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setSearchValue(event.target.value)}
        />
      </Form>
    </>
  )
}

export default SearchBox;