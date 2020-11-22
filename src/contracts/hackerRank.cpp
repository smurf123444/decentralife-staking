#include <cstdio>
#include <string>
#include <iostream>
#include <fstream>

using namespace std;


/*
 * Complete the 'perfectTeam' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING skills as parameter.
 */

int perfectTeam(string skills) {
    int i = 0;
    int c = 0;
    int value_students[]= {0, 0, 0, 0, 0};
    while (i < skills.size())
        if(skills[i++] == 'p')
        {
           value_students[0] = 1; 
        }
        else if(skills[i++] == 'c')
        {
           value_students[1] = 1; 
        }
        else if(skills[i++] == 'm')
        {
           value_students[2] = 1; 
        }       
         else if(skills[i++] == 'b')
        {
           value_students[3] = 1; 
        }
        else if(skills[i++] == 'z')
        {
           value_students[4] = 1; 
        }
        if(value_students[0] == 1 
        && value_students[1] == 1 
        && value_students[2] == 1 
        && value_students[3] == 1 
        && value_students[4] == 1)
        {
            value_students[0] = 0;
            value_students[1] = 0;
            value_students[2] = 0;
            value_students[3] = 0;
            value_students[4] = 0;
            c++;
        }
        
return c;
}





int main()
{
    ofstream fout(getenv("OUTPUT_PATH"));

    string skills;
    getline(cin, skills);

    int result = perfectTeam(skills);

    fout << result << "\n";

    fout.close();

    return 0;
}