async function fetchChallengeById(challenge_id) {
  try {
    const response = await fetch(
      `http://localhost:4000/fetchChallenge/${challenge_id}`,
    );
    const data = await response.json();

    if (response.status >= 400) {
      throw new Error(
        `Failed to fetch challenge: ${response.status} ${response.statusText}`,
      );
    }

    return data.challenge;
  } catch (error) {
    console.error("Error fetching challenges:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}

async function fetchChallengesInRange(user_id, lower, upper) {
  try {
    const response = await fetch(
      `http://localhost:4000/fetchChallengesInRange/${user_id}/${lower}/${upper}`,
    );
    const data = await response.json();

    if (response.status >= 400) {
      throw new Error(
        `Failed to fetch challenges: ${response.status} ${response.statusText}`,
      );
    }

    return data.challenges;
  } catch (error) {
    console.error("Error fetching challenges:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}

module.exports = { fetchChallengesInRange, fetchChallengeById };
