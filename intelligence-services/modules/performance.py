def analyze_performance(subjects):

    if not subjects:
        return None

    strongest = max(
        subjects,
        key=lambda s: s.averageScore,
    )

    weakest = min(
        subjects,
        key=lambda s: s.averageScore,
    )

    return {

        "strongest": {

            "name": strongest.name,

            "score": strongest.averageScore,

        },

        "weakest": {

            "name": weakest.name,

            "score": weakest.averageScore,

        }

    }