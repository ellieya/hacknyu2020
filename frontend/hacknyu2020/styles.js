import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A9C1E5',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  h1: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: "center"
  },
  importantText: {
    color: "#FFF",
    fontSize: 40,
    textAlign: "center",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#707070',
    width: '85%',
    backgroundColor: '#FFEACC',
    margin: 10
  },
  logo: {
    width: "100%"
  },
  buttonInline: {
    width: '100%',
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-evenly'
  },
  dadJokeContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  dadJoke: {
    fontSize: 20,
    textAlign: 'center'
  },
  someSpace: {
    marginTop: 10,
    marginBottom: 10
  },
  pointsView: {
    position: "absolute",
    top: 0,
    right: 0,
    marginTop: 30,
    marginRight: 25
  },
  pointsText: {
    position: "absolute",
    fontSize: 20,
    color: "#FFF",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    top: 27,
    right: 8
  },
  cart: {
    backgroundColor: '#fff',
    width: '90%',
    height: '75%'
  }
});

export default styles;