import { ref, runTransaction } from 'firebase/database';
import { db } from '../firebase';

/**
 * Generates a sequential Membership ID.
 * Format: LMAETE + Sequence(001201) + Suffix(S/P/I)
 * Starts sequence from 1201.
 * @param {string} membershipType - 'student', 'professional', or 'institutional'
 * @returns {Promise<string>} The generated Membership ID
 */
export const generateMembershipId = async (membershipType) => {
    const counterRef = ref(db, 'counters/membershipId');

    let newSequence = 0;

    // 1. Atomically increment the counter
    // 1. Atomically increment the counter
    const result = await runTransaction(counterRef, (currentValue) => {
        // If null (first time), start at 1200 so the first increment gives 1201
        return (currentValue || 1200) + 1;
    });

    if (result.committed) {
        newSequence = result.snapshot.val();
    }

    // If transaction failed or didn't return a value for some reason
    if (!newSequence) {
        throw new Error("Failed to generate membership ID sequence.");
    }

    // 2. Determine Suffix
    let suffix = 'M'; // Default Member
    if (membershipType === 'student') suffix = 'S';
    else if (membershipType === 'professional') suffix = 'P';
    else if (membershipType === 'institutional') suffix = 'I';

    // 3. Format ID
    // 6 digits padding? "001201" implies 6 digits.
    const sequenceStr = newSequence.toString().padStart(6, '0');

    return `LMAETE${sequenceStr}${suffix}`;
};
