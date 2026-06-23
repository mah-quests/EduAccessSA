export function matchOpportunities(user, opportunities) {
  return opportunities.map(opp => {
    const reasons = []
    let score = 0

    const avg = Number(user.averageMark)

    if (avg >= opp.minMark) {
      score += 50
      reasons.push(`Your ${avg}% average meets the ${opp.minMark}% minimum`)
    }

    const hasInterestMatch = opp.fields.includes('All Fields') ||
      opp.fields.some(f => user.interests.some(i => f.toLowerCase().includes(i.toLowerCase()) || i.toLowerCase().includes(f.toLowerCase())))
    if (hasInterestMatch) {
      score += 30
      const matchedField = opp.fields.find(f =>
        f === 'All Fields' || user.interests.some(i => f.toLowerCase().includes(i.toLowerCase()) || i.toLowerCase().includes(f.toLowerCase()))
      )
      reasons.push(matchedField === 'All Fields' ? 'Open to all fields of study' : `Matches your interest in ${matchedField}`)
    }

    const provinceMatch = opp.provinces.includes('All Provinces') || opp.provinces.includes(user.province)
    if (provinceMatch) {
      score += 20
      reasons.push(opp.provinces.includes('All Provinces') ? 'Available in your province' : `Available in ${user.province}`)
    }

    return {
      ...opp,
      matched: score >= 50,
      matchScore: score,
      matchReasons: reasons,
    }
  }).sort((a, b) => b.matchScore - a.matchScore)
}
