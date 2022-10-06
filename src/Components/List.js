import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
import axios from "axios";

const List = () => {
    const [lists, setLists] = useState([]);

    const [searchValue, setSearchValue] = useState("");
    console.log(searchValue);

    useEffect(() => {
        retrieveLists();
    }, []);

    const retrieveLists = async () => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/`);

            console.log(response.data, "<== response poke list");
            setLists(response.data.results);
        } catch (error) {
            console.log(error, "<== error retrieve poke list");
        }
    };

    return (
        <div className="my-5">
            <Container>
                <div className="img-ball">
                    <h1>Hello Pokemon!</h1>
                </div>

                <input className="form-control mb-3" onChange={(e) => setSearchValue(e.target.value)} placeholder="Type to search..."></input>

                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th> Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lists
                                .filter((result) => result.name.toLowerCase().includes(searchValue))
                                .map((result, index) => (
                                    <tr key={index}>
                                        <td>{index + 1} </td>
                                        <td>{result.name}</td>
                                        <td>
                                            {/* <Button onClick={() => retrieveListsDetail(result.name)}>Detail</Button> */}
                                            <Link to={`/detail/${result.name}`} className="btn btn-primary">
                                                Detail
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </div>
            </Container>
        </div>
    );
};

export default List;
