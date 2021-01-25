import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import firebase from 'firebase'
import fire from '../../database'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end


function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 500,
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		display: 'flex'
	},
	rootfortext: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '80ch',
		},
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
}));



export default function DashBoard() {
	const classes = useStyles();
	const [users, setUsers] = useState('')



	useEffect(function effectFunction() {
		firebase.database().ref('users').on('value', snapshot => {
			let data = snapshot.val() ? snapshot.val() : {};
			let HistoryItems = { ...data };
			setUsers(HistoryItems)
		})
	}, []);

	const usersLength = Object.keys(users)


	let capacity = 6000;
	let value = 4000;
	let circleSize = 0.8;

	let component = am4core.create("chartdiv", am4core.Container)
	component.width = am4core.percent(100);
	component.height = am4core.percent(100);

	let chartContainer = component.createChild(am4core.Container);
	chartContainer.x = am4core.percent(50)
	chartContainer.y = am4core.percent(50)

	let circle = chartContainer.createChild(am4core.Circle);
	circle.fill = am4core.color("#dadada");

	let circleMask = chartContainer.createChild(am4core.Circle);

	let waves = chartContainer.createChild(am4core.WavedRectangle);
	waves.fill = am4core.color("#34a4eb");
	waves.mask = circleMask;
	waves.horizontalCenter = "middle";
	waves.waveHeight = 10;
	waves.waveLength = 30;
	waves.y = 500;
	circleMask.y = -500;

	component.events.on("maxsizechanged", function () {
		let smallerSize = Math.min(component.pixelWidth, component.pixelHeight);
		let radius = smallerSize * circleSize / 2;

		circle.radius = radius;
		circleMask.radius = radius;
		waves.height = smallerSize;
		waves.width = Math.max(component.pixelWidth, component.pixelHeight);

		//capacityLabel.y = radius;

		let labelRadius = radius + 20

		capacityLabel.path = am4core.path.moveTo({ x: -labelRadius, y: 0 }) + am4core.path.arcToPoint({ x: labelRadius, y: 0 }, labelRadius, labelRadius);
		capacityLabel.locationOnPath = 0.5;

		setValue(value);
	})


	function setValue(value) {
		let y = - circle.radius - waves.waveHeight + (1 - value / capacity) * circle.pixelRadius * 2;
		waves.animate([{ property: "y", to: y }, { property: "waveHeight", to: 10, from: 15 }, { property: "x", from: -50, to: 0 }], 5000, am4core.ease.elasticOut);
		circleMask.animate([{ property: "y", to: -y }, { property: "x", from: 50, to: 0 }], 5000, am4core.ease.elasticOut);
	}


	let label = chartContainer.createChild(am4core.Label)
	let formattedValue = component.numberFormatter.format(value, "#.#a");
	formattedValue = formattedValue.toUpperCase();

	label.text = formattedValue + " Litres";
	label.fill = am4core.color("#fff");
	label.fontSize = 30;
	label.horizontalCenter = "middle";


	let capacityLabel = chartContainer.createChild(am4core.Label)

	let formattedCapacity = component.numberFormatter.format(capacity, "#.#a").toUpperCase();;

	capacityLabel.text = "Capacity " + formattedCapacity + " Litres";
	capacityLabel.fill = am4core.color("#34a4eb");
	capacityLabel.fontSize = 20;
	capacityLabel.textAlign = "middle";
	capacityLabel.padding(0, 0, 0, 0);



	return (
		<>
			<div className={classes.root} style={{ marginLeft: 10,marginRight:10 }}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={3}>
						<Paper className={classes.paper}>
							<div style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>Total Users</div>
							<h1 style={{ marginTop: '10%', color: 'black', textAlign: "center" }}>{usersLength.length}</h1>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={3}>
						<Paper className={classes.paper}>
							<div style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>Total Visitors</div>
							<h1 style={{ marginTop: '10%', color: 'black', textAlign: "center" }}>{usersLength.length}</h1>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={3}>
						<Paper className={classes.paper}>
							<div style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>Total Packages Purchased</div>
							<h1 style={{ marginTop: '10%', color: 'black', textAlign: "center" }}>{usersLength.length}</h1>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={3}>
						<Paper className={classes.paper}>
							<div style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>Total Users</div>
							<h1 style={{ marginTop: '10%', color: 'black', textAlign: "center" }}>{usersLength.length}</h1>
						</Paper>
					</Grid>
				</Grid>
			</div>
		</>
	);
}
