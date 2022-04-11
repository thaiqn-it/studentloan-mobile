import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Login";
import TabNavigator from "../navigations/TabNavigator";
import Register from "../Register";
import ForgotPassword from "../ForgotPassword";
import Verification from "../Verification";
import ChangePassword from "../ChangePassword";
import Setting from "../Setting";
import Home from "../Home";
import DetailPost from "../DetailPost";
import BackSelection from "../BackSelection";
import Profile from '../Profile';
import Onboarding from '../Onboarding';
import RegisterPhone from '../RegisterPhone';
import Invest from '../Invest';
import Verify from "../Verify";
import InvestmentDetail from "../InvestmentDetail";
import History from "../History";
import TransactionInfo from "../TransactionInfo";
import DepositMoney from "../DepositMoney";
import FilterHistory from "../FilterHistory";
import WithdrawMoney from "../WithdrawMoney";
import SuccessPayment from "../SuccessPayment";
import Contract from "../Contract";
import ContractDetail from "../ContractDetail";
import Analytic from "../Analytic";
import Notification from "../Notification";
import Evidence from "../Evidence";
import LoanHistory from "../LoanHistory";
import AdjustInvestment from "../AdjustInvestment";

const Stack = createStackNavigator();

export default function AppStack() {
    return (
        <Stack.Navigator initialRouteName={"Onboarding"}>
            <Stack.Screen
                name={"Login"}
                component={Login}
                options={{
                    headerShown: false,
                }}
            /> 
            <Stack.Screen
                name={"Onboarding"}
                component={Onboarding}
                options={{
                    headerShown: false,
                }}
            /> 
            <Stack.Screen
                name={"HomeTab"}
                component={TabNavigator}
                options={{
                    headerShown: false,
                }}
            />    
            <Stack.Screen
                name={"Register"}
                component={Register}
                options={{
                    headerShown: false,
                }}
            />  
            <Stack.Screen
                name={"Forgot"}
                component={ForgotPassword}
                options={{
                    headerShown: false,
                }}
            />    
            <Stack.Screen
                name={"Verification"}
                component={Verification}
                options={{
                    headerShown: false,
                }}
            />   
            <Stack.Screen
                name={"ChangePassword"}
                component={ChangePassword}
                options={{
                    headerShown: false,
                }}
            /> 
            <Stack.Screen
                name={"Setting"}
                component={Setting}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={"Profile"}
                component={Profile}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={"RegisterPhone"}
                component={RegisterPhone}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
              name={"Home"}
              component={Home}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={"DetailPost"}
              component={DetailPost}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={"BackSelection"}
              component={BackSelection}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={"Invest"}
              component={Invest}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={"Verify"}
              component={Verify}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={"InvestmentDetail"}
              component={InvestmentDetail}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={"History"}
              component={History}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={"TransactionInfo"}
              component={TransactionInfo}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={"DepositMoney"}
              component={DepositMoney}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={"WithdrawMoney"}
              component={WithdrawMoney}
              options={{
                headerShown: false,
              }}
            />
              <Stack.Screen
                name={"FilterHistory"}
                component={FilterHistory}
                options={{
                  headerShown: false,
                }}
              />
               <Stack.Screen
                name={"Contract"}
                component={Contract}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name={"ContractDetail"}
                component={ContractDetail}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name={"Analytic"}
                component={Analytic}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name={"LoanHistory"}
                component={LoanHistory}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name={"Evidence"}
                component={Evidence}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name={"Notification"}
                component={Notification}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name={"AdjustInvestment"}
                component={AdjustInvestment}
                options={{
                  headerShown: false,
                }}
              />
                
        </Stack.Navigator>
    )
}
