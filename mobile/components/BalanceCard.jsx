import { View, Text } from "react-native";
import { styles } from "@/assets/styles/home.styles";
import { COLORS } from "@/constants/colors";

// Format angka ke Rupiah dengan ribuan (dot sebagai separator)
const formatRupiah = (amount) => {
  const num = parseFloat(amount) || 0;
  return num.toLocaleString("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export const BalanceCard = ({ summary }) => {
  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceTitle}>Total Balance</Text>
      <Text style={styles.balanceAmount}>
        Rp {formatRupiah(summary.balance)}
      </Text>
      <View style={styles.balanceStats}>
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Income</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.income }]}>
            +Rp {formatRupiah(summary.income)}
          </Text>
        </View>
        <View style={[styles.balanceStatItem, styles.statDivider]} />
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Expenses</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.expense }]}>
            -Rp {formatRupiah(Math.abs(parseFloat(summary.expense)))}
          </Text>
        </View>
      </View>
    </View>
  );
};
