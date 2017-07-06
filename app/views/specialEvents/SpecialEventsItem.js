import React from 'react';
import {
	View,
	Text,
	StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';

import Touchable from '../common/Touchable';
import {  getHumanizedDuration } from '../../util/general';
import {
	COLOR_DGREY,
	COLOR_LGREY,
	COLOR_BLACK,
	COLOR_YELLOW
} from '../../styles/ColorConstants';

const SpecialEventsItem = ({ specialEventsData, saved, add, remove }) => (
	<View
		style={styles.itemRow}
	>
		<CircleBorder />
		<View style={styles.titleContainer}>
			<Touchable
				onPress={() => Actions.SpecialEventsDetailView({ data: specialEventsData, add, remove })}
			>
				<View>
					{specialEventsData['talk-title'] ? (
						<Text
							style={styles.titleText}
							numberOfLines={2}
						>
							{specialEventsData['talk-title']}
						</Text>
					) : null }

					<View style={styles.labelView}>
						{ specialEventsData.label ? (
							<Text style={[styles.labelText, { color: specialEventsData['label-theme'] ? specialEventsData['label-theme'] : COLOR_BLACK }]}>{specialEventsData.label}</Text>
						) : null }
						{ specialEventsData['talk-type'] === 'Keynote' ? (
							<Text style={styles.labelText}>{specialEventsData['talk-type']}</Text>
						) : null }
						{ specialEventsData.label || specialEventsData['talk-type'] === 'Keynote' ? (
							<Text style={styles.labelText}> - </Text>
						) : null }
						<Text style={styles.labelText}>{getHumanizedDuration(specialEventsData['start-time'], specialEventsData['end-time'])}</Text>
					</View>
				</View>
			</Touchable>
		</View>

		{ (add !== null) ? (
			<Touchable
				style={styles.starButton}
				onPress={
					() => ((saved) ? (remove(specialEventsData.id)) : (add(specialEventsData.id)))
				}
			>
				<View style={styles.starButtonInner}>
					<Icon
						name={'ios-star-outline'}
						size={32}
						style={styles.starOuterIcon} // TODO: USE Color Constant when avail
					/>
					{ saved ? (
						<Icon
							name={'ios-star'}
							size={26}
							style={styles.starInnerIcon}
						/>
					) : null }
				</View>
			</Touchable>
		) : null }
	</View>
);

const CircleBorder = () => (
	<View style={styles.borderContainer}>
		<View style={styles.line} />
		<View style={styles.circle} />
	</View>
);

const styles = StyleSheet.create({
	itemRow: { flexGrow: 1, flexDirection: 'row', backgroundColor: COLOR_LGREY },
	titleContainer: { flex: 1, marginTop: 3, justifyContent: 'center' },
	titleText: { alignSelf: 'stretch', fontSize: 17, color: COLOR_BLACK },
	labelView: { flexDirection: 'row', paddingTop: 4 },
	labelText: { fontSize: 13 },
	starButton: { justifyContent: 'center', width: 50 },
	starButtonInner: { alignItems: 'center' },
	starOuterIcon: { color: COLOR_DGREY },
	starInnerIcon: { position: 'absolute', backgroundColor: 'transparent', marginTop: 3, color: COLOR_YELLOW },
	borderContainer: { width: 1, alignSelf: 'stretch', marginHorizontal: 20, alignItems: 'flex-start' },
	line: { flexGrow: 1, borderLeftWidth: 1, borderColor: COLOR_DGREY, paddingBottom: 20 },
	circle: { position: 'absolute', top: 11, left: -2.5, height: 6, width: 6, borderRadius: 3, borderWidth: 1, borderColor: COLOR_DGREY, backgroundColor: COLOR_LGREY },
});

export default SpecialEventsItem;