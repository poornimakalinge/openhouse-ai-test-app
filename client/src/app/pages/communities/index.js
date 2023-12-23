import React, { useState, useEffect } from "react";
import './index.scss';
import community_img from '../../../images/community.png';
import Loader from '../../components/loader';

const Communities = () => {
	const [masterCommunities, setMasterCommunities] = useState([]);
	const [communities, setCommunities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const streamReader = (body) => {
		const reader = body.getReader();
			
		const stream = new ReadableStream({
			start(controller) {
				return pump();
				function pump() {
				return reader.read().then(({ done, value }) => {
					// When no more data needs to be consumed, close the stream
					if (done) {
						controller.close();
						return;
					}
					// Enqueue the next data chunk into the target stream
					controller.enqueue(value);
					return pump();
				});
				}
			},
		});
		const result = new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
		return result;
	}

	const fetchCommunityHomes = async () => {
		await fetch('/homes')
		.then(async (response) => {
			let result = await streamReader(response.body); // the response type is basic & coming as a stream data.
			result = JSON.parse(result)
			const altered_communities = masterCommunities.map(comm => comm).sort((a, b) => a.name === b.name ? 0 : a.name < b.name ? -1 : 1);
			altered_communities.forEach((comm) =>
			{
				const homes = result.filter(home => home.communityId === comm.id);
				const total_price = homes.reduce((sum, val) => (sum + val.price), 0);
				comm.avg_price = total_price ? (total_price / homes.length).toFixed(2) : 0;
			})
			setCommunities(altered_communities);
			setIsLoading(false);
		})
		.catch(error => {
			console.log('error', error)
			setIsLoading(false);
		});
	}

	useEffect( () => {
		const fetchCommunities = async () => { 
			setIsLoading(true);
			await fetch('/communities')
				.then(async (response) => {
					const result = await streamReader(response.body);
					console.log(result);
					const communities_list = JSON.parse(result)
					setMasterCommunities(communities_list);
				})
				.catch(error => {
					console.log('error', error)
					setIsLoading(false);
				});
		}
		fetchCommunities();
	}, []);

	useEffect( () => {
		if(masterCommunities?.length)
			fetchCommunityHomes();
	}, [masterCommunities]);

	return (
		<div className='dashboard'>
		<div className="dashboard__table">
			<table>
				<tbody>
				<tr>
					<th>Community Name</th>
					<th>Community Image</th>
					<th>Avg. Price of homes ($)</th>
				</tr>
				{
					!isLoading && communities && communities.length > 0 ?
				 	communities.map((community) => (
						<tr className='rows' key={community.id}>
							<td>{community.name}</td>
							<td><img className='img' src={community.imgUrl !== '' ? community.imgUrl : community_img} alt='community_img'/></td>
							<td>{community.avg_price}</td>
						</tr>
					))
					:
					isLoading ?
						<Loader />
					:
					<div className='empty_data'> No Data...</div>
				}
				</tbody>
			</table>
		</div>
		</div>
	)
}

export default React.memo(Communities);