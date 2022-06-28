---
title: 背包问题
author: Shallrise
date: '2022-05-04'
---

## 01背包问题

​		在 01 背包问题为有 N 件物品和一个容量为 V 的背包，每个物品只有放入背包与不放背包 两种状态，要求在有限的背包容量下，装入的物品总价值最大。 设计其背包的 dp 方程为： f[i][j] = max{f[i-1][j],f[i-1][j-w[i]]+w[i]}; 在使用该方程前首先初始化背包当输入不合法时装入的物品设为 0。 f[i][j]:表示所有选法集合中,只从前i个物品中选,并且总体积≤≤j的选法的集合,它的 值是这个集合中每一个选法的最大值. f[i-1][j]表示不选第 i 个物品的集合中的最大值 f[i-1][j-w[i]]+w[i]表示选第 i 个物品的集合,但是直接求不容易求所在集合的属性,这 里迂回打击一下,先将第 i 个物品的体积减去,求剩下集合中选法的最大值.

#### 二维求解：

   动态规划求解 0/1 背包问题需要使用 dp 方程进行求解，使用二维空间对其进行分析： （1） 状态 f[i][j]定义：前 i 个物品，背包容量 j 下的最优解（最大价值） 当前的状态依赖于之前的状态，可以理解为从初始状态 f[0][0]=0 开始决策，有 N 件物品，则需要 N 次决策，每一次对第 i 件物品的决策，状态 f[i][j]不断由之前的 状态更新而来。 （2） 当前背包容量不够即 j

```c
for(int i=0;i<n;i++)
    {
        for(int j=0;j<=m;j++){
            if(j<w[i])
            {
                f[i][j] = f[i-1][j];
            } else {
                f[i][j] = max(f[i-1][j], f[i - 1][j - w[i]] + v[i]);
            }
        }  
    }
```

#### 一维优化：

```c
for(int i=1;i<=n;i++)
{
    for(int j=m;j>=v[i];j--)
    {
        f[j] = max(f[j],f[j-v[i]]+w[i]);
    }
}
```



## 完全背包问题

完全背包只考虑前 i 个物品，且总体积不大于 j 的所有选法。其中第i种物品的体积是vi,价值是wi

- 分组依据：第 i 个物品选多少个

- 求最大值步骤

  - 求去掉k个物品i

  - 求max  

    ```c
    f[i-1,j-k*v[i]]
    ```

    再加回来k个物品i   f[i,j] = f[i-1,j-k×*v[i]] + k×*w[i]

完全背包问题二维解法：

暴力求解列举：

```c
#include<iostream>
#include<algorithm>
using namespace std;

const int N = 1010;
int n,m;
int v[N],w[N];
int f[N][N];

int main()
{
    cin>>n>>m;
    for(int i=1;i<=n;i++)
    {
        cin>>v[i]>>w[i];
    }
    for(int i=1;i<=n;i++)
    {
        for(int j=0;j<=m;j++)
        {
            for(int k=0;k*v[i]<=j;k++)
            {
                f[i][j]=max(f[i][j],f[i][j-k*v[i]]+k*w[i]);
            }
        }
    }
    cout<<f[n][m]<<endl;
    
    return 0;
}
```

#### 二维优化：

```c
  for(int i=1;i<=n;i++)
    {
        for(int j=0;j<=m;j++)
        {
            f[i][j]=f[i-1][j];
            if(j>=v[i])f[i][j]=max(f[i][j],f[i][j-v[i]]+w[i]);
            
        }
    }
```

#### 一维优化：

```c
for(int i=1;i<=n;i++)
{
    for(int j=v[i];j<=m;j++)
    {
         f[j] = max(f[j], f[j - v[i]] + w[i]);
    }
}
```



## 多重背包问题

​	动态规划状态 f[i] [j]集合表示所有只从前i个 物品中选，并且总体积不超过 j 的选法

#### 状态转移方程为：

```c
f[i][j] = max(f[i-1][j-v[i]*k]+w[i]*k);
// k = 0,1,2,...,s[i] 第i个物品选多少个
```

#### 多重背包问题：

​	有 N 种物品和一个容量是 V 的背包。第 i种物品最多有 s$_i$ 件，每件体积是v$_i$，价值是 w$_i$。求解将哪些物品装入背包，可使物品体积总和不超过背包容量，且价值总和最大。输出最大价值。

#### 输入格式

第一行两个整数，N，V，用空格隔开，分别表示物品种数和背包容积。

接下来有 N 行，每行三个整数 v$_i$,w$_i$,s$_i$，用空格隔开，分别表示第 ii 种物品的体积、价值和数量。

#### 输出格式

输出一个整数，表示最大价值。

暴力求解：

​		将多重背包问题差分为01背包问题。比如物品1有3件，每件价值为2，我们不妨创建3个物品1，存在数组v和数组w中，最终更新一下总物品数n即可，然后套用01背包问题进行求解。

```c
#include<iostream>
#include<algorithm>
using namespace std;
const int  N=110;
int n,m;
int v[N],w[N],s[N];
int f[N][N];

int main()
{
	cin>>n>>m;
    for(int i=1;i<=n;i++) cin>>v[i]>>w[i]>>s[i];
    for(int i=1;i<=n;i++)
    {
        for(int j=0;j<=m;j++)
        {
            for(int k=0;k<=s[i]&&k*v[i]<=j;k++)
            {
                f[i][j]=max(f[i][j],f[i-1][j-v[i]*k]+w[i]*k);
            }
        }
    }
    cout<<f[n][m]<<endl;
    return 0;
}
```

#### 多重背包问题优化：

多重背包使用二进制进行优化：假设有一组商品，一共有11个。我们知道，十进制数字 11 可以这样表示
11=1011(B)=0111(B)+(11−0111(B))=0111(B)+0100(B)

正常背包的思路下，我们要求出含这组商品的最优解，我们要枚举12次（枚举装0，1，2....12个）。

现在，如果我们把这11个商品分别打包成含商品个数为1个，2个，4个，4个（分别对应0001,0010,0100,0100）的四个”新的商品 “, 将问题转化为01背包问题，对于每个商品，我们都只枚举一次，那么我们只需要枚举四次 ，就可以找出这含组商品的最优解。 这样就大大减少了枚举次数。

上面的1，2，4，4是可以通过组合来表示出0~11中任何一个数的，首先，11可以这样分成两个二进制数的组合：
11=0111(B)+(11−0111(B))=0111(B)+0100(B)

其中0111通过枚举这三个1的取或不取（也就是对0001(B)，0010(B)，0100(B)的组合），可以表示十进制数0~7( 刚好对应了 1，2，4 可以组合出 0~7 ) , 0~7的枚举再组合上0100(B)( 即 十进制的 4 ) ，可以表示十进制数 0~11。其它情况也可以这样证明

这种优化对于大数尤其明显，例如有1024个商品，在正常情况下要枚举1025次 ， 二进制思想下转化成01背包只需要枚举10次。

使用01优化和二进制优化如下：

```c
#include <iostream>
#include <algorithm>

using namespace std;

const int N = 12010, M = 2010;

int n, m;
int v[N], w[N];
int f[M];

int main()
{
    cin >> n >> m;

    int cnt = 0;
    for (int i = 1; i <= n; i ++ )
    {
        int a, b, s;
        cin >> a >> b >> s;
        int k = 1;
        while (k <= s)
        {
            cnt ++ ;
            v[cnt] = a * k;
            w[cnt] = b * k;
            s -= k;
            k *= 2;
        }
        if (s > 0)
        {
            cnt ++ ;
            v[cnt] = a * s;
            w[cnt] = b * s;
        }
    }

    n = cnt;

    for (int i = 1; i <= n; i ++ )
        for (int j = m; j >= v[i]; j -- )
            f[j] = max(f[j], f[j - v[i]] + w[i]);

    cout << f[m] << endl;

    return 0;
}

```



## 分组背包问题

动态规划状态f [i ] [j]表示只从前 i 组物品中选，且总体积不大于J的所有选法的集合

多重背包问题枚举第 i 种物品选几个 而 分组背包问题是枚举第 i 组物品选哪个或者不选

```c
#include <iostream>
#include <algorithm>

using namespace std;

const int N = 110;

int n, m;
int v[N][N], w[N][N], s[N];
int f[N];

int main()
{
    cin >> n >> m;

    for (int i = 1; i <= n; i ++ )
    {
        cin >> s[i];
        for (int j = 0; j < s[i]; j ++ )
            cin >> v[i][j] >> w[i][j];
    }

    for (int i = 1; i <= n; i ++ )
        for (int j = m; j >= 0; j -- )//仿照01背包逆向枚举体积
            for (int k = 0; k < s[i]; k ++ )
                if (v[i][k] <= j)
                    f[j] = max(f[j], f[j - v[i][k]] + w[i][k]);

    cout << f[m] << endl;

    return 0;
}
```
# Vssue Demo

<Vssue  />

