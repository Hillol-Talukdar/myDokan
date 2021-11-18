import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();

        if (keyword.trim()) {
            history.push(`/search/${keyword}`);
        } else {
            history.push("/");
        }
    };

    return (
        <Form onSubmit={submitHandler} inline>
            <div className="row justify-content-md-center">
                <div className="col">
                    <Form.Control
                        type="text"
                        name="q"
                        onChange={(e) => setKeyword(e.target.value)}
                        placeHolder="Search Product..."
                        // className="mr-sm-2 ml-sm-2"
                    ></Form.Control>
                </div>
                <div className="col">
                    <Button
                        type="submit"
                        variant="outline-secondary"
                        // className="p-2"
                    >
                        Search
                    </Button>
                </div>
            </div>
        </Form>
    );
};

export default SearchBox;
