import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Table, ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Detail = () => {
    const [listsDetail, setListsDetail] = useState([]);
    const { name } = useParams();

    useEffect(() => {
        retrieveListsDetail(name);
    }, []);

    const retrieveListsDetail = async (name) => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

            console.log(response.data, "<== response poke list detail");
            setListsDetail(response.data);
        } catch (error) {
            console.log(error, "<== error retrieve poke list detail");
        }
    };

    return (
        <div className="my-5">
            <Container>
                <h1 className="text-uppercase">{listsDetail.name}</h1>

                <img className="poke-image w-25" src={listsDetail.sprites ? listsDetail.sprites?.front_default || listsDetail.sprites?.front_shiny : "https://via.placeholder.com/468x60?text=Image+not+found"}></img>

                <div>
                    <Table borderless hover>
                        <tr>
                            <td className="p-3">Species</td>
                            <td className="text-start fw-bold text-capitalize">{listsDetail?.species?.name}</td>
                        </tr>
                        <tr>
                            <td className="p-3">Height</td>
                            <td className="text-start">{listsDetail.height}</td>
                        </tr>
                        <tr>
                            <td className="p-3 ">Ability</td>
                            <td className="text-start ">
                                {listsDetail && listsDetail.abilities
                                    ? listsDetail.abilities.map((abl) => (
                                          <>
                                              <span className="text-capitalize spec-sub me-2">{abl.ability.name}</span>
                                          </>
                                      ))
                                    : ""}
                            </td>
                        </tr>

                        {listsDetail && listsDetail.stats
                            ? listsDetail.stats.map((abl) => (
                                  <>
                                      <tr>
                                          <td className="text-capitalize  p-3">{abl.stat.name}</td>
                                          <ProgressBar now={abl.base_stat} label={`${abl.base_stat}%`} animated variant="info" style={{ width: "75%", height: "10%" }} className="pop-up mt-2" />
                                      </tr>
                                  </>
                              ))
                            : ""}
                    </Table>
                </div>
                <Link to={`/`} className="btn btn-primary">
                    Back
                </Link>
            </Container>
        </div>
    );
};

export default Detail;
