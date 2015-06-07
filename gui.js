import random
import simplegui

def RPSLS():
    comp_ints  = 1,2,3,4,5    
    print("Enter your choice:")
            choice = input('Play another round?')
            if choice == 'r' or choice == 'R' or choice == 'Rock' or choice == 'rock' or choice == '1':
                choice_num  = 1
                break
            elif choice == 'S' or choice == 's' or choice == 'Scissors' or choice == 'sciccors' or choice == '2':
                choice_num =  2
                break
            elif choice == 'P' or choice == 'p' or choice == 'Paper' or choice == 'paper' or choice == '3':
                choice_num =  3
                break
            elif choice == 'L' or choice == 'l' or choice == "Lizard" or choice == "lizard" or choice == '4':
                choice_num = 4
                break
            elif choice == 'Sp' or choice == 'SP' or choice == "Spock" or choice == "spock" or choice == '5':
                choice_num = 5
                break
            else:
                print('NO SUCH CHOICE')
                print('Enter once more')
                continue

        comp_choice = random.choice(comp_ints)
        if choice_num == comp_choice:
            print('It\'s a draw!')
        elif (choice_num == 1 and comp_choice == 2) or (choice_num == 2 and comp_choice == 3) or (choice_num == 3 and comp_choice == 1) or (choice_num == 4 and comp_choice == 2) or (choice_num == 4 and comp_choice == 5) or (choice_num == 5 and comp_choice == 1) or (choice_num == 1 and comp_choice == 4) or (choice_num == 2 and comp_choice == 3) or (choice_num == 3 and comp_choice == 1) or (choice_num == 4 and comp_choice == 2) or (choice_num == 4 and comp_choice == 5) or (choice_num == 5 and comp_choice == 1) or (choice_num == 1 and comp_choice == 4) or (choice_num == 2 and comp_choice == 3) or (choice_num == 3 and comp_choice == 1) or (choice_num == 4 and comp_choice == 2) or (choice_num == 4 and comp_choice == 5) or (choice_num == 5 and comp_choice == 1) or (choice_num == 2 and comp_choice == 5) or (choice_num == 3 and comp_choice == 4) :
            print('You win!')
        else:
            print('You lose...')


        while True:
            answer = input('Play another round?')
            if answer == 'y' or answer == 'Y' or answer == 'yes' or answer == 'Yes' or answer == 'ye' or answer == 'Ye' or answer == 'sure' or answer == 'Sure':
                break
            elif answer == 'n' or answer == 'N' or answer == 'no' or answer == 'No' or answer == 'nah' or answer == 'Nah':
                print('Thanks for playing!')
                break
            else:
                print('Yay or nay...')
                continue
            break

RPSLS()
