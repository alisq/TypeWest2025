function InformationPage () {
    return (
        <div className="two-up small-one-up padding-1-rem">
            <div>
                
                <img src={`${process.env.PUBLIC_URL}/img/groupPic.png`} />
                <div>
                    <br />
                <h3>Online cohort</h3>
                <p>
                    The 2025 Type West Online cohort was supported by a dedicated faculty and teaching assistants whose sustained guidance, critique, and care shaped the work throughout the program. Their commitment fostered a rigorous and generous learning environment across time zones and contexts. The program also extends thanks to the many guest critics, visiting designers, and workshop instructors whose contributions broadened perspectives and enriched the experience. 

                </p>
            </div>
            </div>
            <div>
                
                <img src={`${process.env.PUBLIC_URL}/img/groupPic_in_person.jpg`} />
                  <div>
                    <br />
                <h3>In person Cohort</h3>
                <p>
                    The 2025 Type West In-Person cohort was guided by faculty and teaching assistants whose close mentorship, critique, and shared studio time deeply informed the work. Their presence and engagement fostered an intensive, collaborative learning environment. The program also gratefully acknowledges the guest critics, visiting designers, and workshop instructors whose insights and generosity strengthened the curriculum.

                </p>
            </div>
            </div>
             
          
        <div className="top-pad-2"></div>
        </div>
    )
}

export default InformationPage;