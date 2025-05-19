import requests
import json

        #readableArray = json.dumps(sorted_array, sort_keys=True, indent=4)

class MakeApiCall:

    def get_user_data(self, api):
        response = requests.get(f"{api}")
        if response.status_code == 200:
            self.createArray(response.json())
        else:
            print(
                f"Error occured: {response.status_code}")

    def createArray(self, obj):
        playerObject = {}
        for element in obj['elements']:
            playerObject.update({element['id']: {'pointsPerGame': element['points_per_game'], 'totalPoints': element['total_points']}})
        
        playerArray = list(playerObject.items())
        arrayA = self.sortByTotalPoints(playerArray)
        arrayB = self.sortByPointsPerGame(playerArray)
        self.compareArrays(arrayA, arrayB, playerArray)

    def sortByTotalPoints(self, array):
        sorted_array = sorted(array, key=lambda x: x[1]['totalPoints'], reverse=True)
        return sorted_array

    def sortByPointsPerGame(self, array):
        sorted_array = sorted(array, key=lambda x: x[1]['pointsPerGame'], reverse=True)
        return sorted_array

    # Function to compare both arrays and find any players that exist in both
    def compareArrays(self, arrayA, arrayB, playerArray):
        # Get first 50 values of arrayA
        first_25_A = set(x[0] for x in arrayA[:25])
        # Get first 50 values of arrayB
        first_25_B = set(x[0] for x in arrayB[:25])
        # Use intersection method to create an array of values that exist in both arrays
        common_players = first_25_A.intersection(first_25_B)
        print(common_players)

    def __init__(self, api):
        self.get_user_data(api)

if __name__ == "__main__":
    api_call = MakeApiCall("https://fantasy.premierleague.com/api/bootstrap-static/")