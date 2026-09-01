import BirthdayExperience from './BirthdayExperience'
import ProposalExperience from './ProposalExperience'
import AnniversaryExperience from './AnniversaryExperience'
import SorryExperience from './SorryExperience'
import LoveLetterExperience from './LoveLetterExperience'
import ValentineExperience from './ValentineExperience'
import FriendshipExperience from './FriendshipExperience'
import CongratulationsExperience from './CongratulationsExperience'
import JustBecauseExperience from './JustBecauseExperience'

export const EXPERIENCES = {
  birthday: BirthdayExperience,
  proposal: ProposalExperience,
  anniversary: AnniversaryExperience,
  sorry: SorryExperience,
  'love-letter': LoveLetterExperience,
  valentine: ValentineExperience,
  friendship: FriendshipExperience,
  congratulations: CongratulationsExperience,
  'just-because': JustBecauseExperience,
}

export function getExperience(occasionId) {
  return EXPERIENCES[occasionId] || JustBecauseExperience
}
