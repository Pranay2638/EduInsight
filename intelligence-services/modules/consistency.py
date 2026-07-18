def analyze_consistency(improvement):

    if improvement >= 10:
        return "Improving"

    if improvement <= -10:
        return "Declining"

    return "Stable"