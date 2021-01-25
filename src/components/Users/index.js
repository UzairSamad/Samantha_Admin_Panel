import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import firebase from "firebase"
import FormControl from '@material-ui/core/FormControl';
import fire from "../../database"
import Card from "../../components/App/UserCard"

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	formControl: {
		marginTop: theme.spacing(2),
		minWidth: 300,
		marginLeft: 10,


	},
}));

const Video = (props) => {
	const classes = useStyles();
	const [ArrayData, setArrayData] = React.useState([])
	const [userData, setUserData] = React.useState([])
	const [state, setState] = React.useState({
		age: ""
	})

	React.useEffect(() => {
		firebase.database().ref("users").on("value", snapshot => {
			let data = snapshot.val() ? snapshot.val() : {}
			let Items = { ...data }
			setArrayData(Items)
			console.log('Items', Items)
		})
	}, [])

	const keys = Object.keys(ArrayData)

	const handleSelectChange = (event) => {
		const uuid = event.target.value;
		const name = event.target.name;
		console.log(name, uuid, "NAAASDASASD");
		if (uuid) {
			firebase.database().ref(`users-purchases/${uuid}`).on("value", snapshot => {
				let data = snapshot.val() ? snapshot.val() : {}
				let items = { ...data }
				setUserData(items)
			})
		}
		setState({
			...state,
			[name]: event.target.value,
		});
	};

	const usersValues = Object.keys(userData)
	console.log(state.age, "USSADASDASDSDAS");

	return (
		<>
			<div class="row">
				<div class="col-md-6 col-sm-12">
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="outlined-age-native-simple">Filter Packages By Users</InputLabel>
						<Select
							fullWidth
							native
							value={state.age}
							onChange={handleSelectChange}
							inputProps={{
								name: 'age',
								id: 'age-native-simple',
							}}
						>

							{/* <select> */}
							<option aria-label="None" value="" />
							{
								keys.map((val, ind) => {
									const { name, uuid } = ArrayData[val]
									return (
										<option value={uuid}>{name}</option>
									)
								})
							}
							{/* </select> */}

						</Select>
					</FormControl>

				</div>
			</div>
			<div style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}>Number of Packages: <span>
				{usersValues.length}</span></div>
			<div className="row">
				{
					usersValues.map((data) => {
						return (
							<div class="col-md-4 col-sm-12">
								<Card data={userData[data]} />
							</div>
						)
					})
				}
			</div>
		</>
	)

}

export default Video;