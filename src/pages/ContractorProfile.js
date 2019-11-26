import React, { Component } from 'react'
import axios from 'axios'


const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1NzQ4OTQ5MjR9.3FYd_ClS1Ixneknsl2lfQnpWBD47Jmyvr0HVUcwMYfE"
const headers = { Authorization: `Bearer ${ACCESS_TOKEN}` }
export default class ContractorProfile extends Component {

  state = { contractorInfo: [] }

  fetchProfile = async () => {
    const { match } = this.props;
    const requests = [
      axios.get(`http://localhost:3000/contractors/${match.params.profile}`, { headers }),
    ];
    const [
      { data: contractorInfo }
    ] = await Promise.all(requests);
    this.setState({ contractorInfo })
    console.log(contractorInfo)
  }

  componentDidMount() {
    this.fetchProfile()
  }
  render() {
    const { contractorInfo } = this.state
    return (
      <div>
        <h1>Contractor Profile</h1>
        <p>{contractorInfo.first_name} {contractorInfo.last_name}</p>
        <p>{contractorInfo.address}</p>
        <p>{contractorInfo.background_check ? <img src="https://nexusipe-resource-exchange.s3.amazonaws.com/pictures/ambassador_large.png" className="badge"></img> : "Not Yet Verified"}</p>

      </div>
    )
  }
}
